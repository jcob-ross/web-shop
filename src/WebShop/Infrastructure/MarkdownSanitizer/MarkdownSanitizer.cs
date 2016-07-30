using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using HtmlAgilityPack;

namespace WebShop.Infrastructure.MarkdownSanitizer
{
  public interface IMarkdownSanitizer
  {
    string SanitizeHtml(string text);
    string StripHtml(string text);
  }

  public sealed class MarkdownSanitizer : IMarkdownSanitizer
  {
    private readonly Dictionary<string, string[]> _whitelist;
    private readonly HashSet<string> _whitelistedTags;

    private StringBuilder _sb = new StringBuilder(); // cleared before usage, left as-is afterwards
    private HtmlEncoder _htmlEncoder;
    private UrlEncoder _urlEncoder;

    public MarkdownSanitizer()
    {
      _htmlEncoder = HtmlEncoder.Create();
      _urlEncoder = UrlEncoder.Default;

      _whitelist = new Dictionary<string, string[]>
      {
        {"p", new string[]          {"style", "class", "align"}},
        {"div", new string[]        {"style", "class", "align"}},
        {"span", new string[]       {"style", "class"}},
        {"br", new string[]         {"style", "class"}},
        {"hr", new string[]         {"style", "class"}},
        {"label", new string[]      {"style", "class"}},

        {"h1", new string[]         {"style", "class"}},
        {"h2", new string[]         {"style", "class"}},
        {"h3", new string[]         {"style", "class"}},
        {"h4", new string[]         {"style", "class"}},
        {"h5", new string[]         {"style", "class"}},
        {"h6", new string[]         {"style", "class"}},

        {"font", new string[]       {"style", "class", "color", "face", "size"}},
        {"strong", new string[]     {"style", "class"}},
        {"b", new string[]          {"style", "class"}},
        {"em", new string[]         {"style", "class"}},
        {"i", new string[]          {"style", "class"}},
        {"u", new string[]          {"style", "class"}},
        {"strike", new string[]     {"style", "class"}},
        {"ol", new string[]         {"style", "class"}},
        {"ul", new string[]         {"style", "class"}},
        {"li", new string[]         {"style", "class"}},
        {"blockquote", new string[] {"style", "class"}},
        {"code", new string[]       {"style", "class"}},
        {"pre", new string[]        {"style", "class"}},

        {"a", new string[]          {"style", "class", "href", "title"}},
        {"img", new string[]        {"style", "class", "src", "height", "width", "alt", "title", "hspace", "vspace", "border"}},

        {"table", new string[]      {"style", "class"}},
        {"thead", new string[]      {"style", "class"}},
        {"tbody", new string[]      {"style", "class"}},
        {"tfoot", new string[]      {"style", "class"}},
        {"th", new string[]         {"style", "class", "scope"}},
        {"tr", new string[]         {"style", "class"}},
        {"td", new string[]         {"style", "class", "colspan"}},

        {"q", new string[]          {"style", "class", "cite"}},
        {"cite", new string[]       {"style", "class"}},
        {"abbr", new string[]       {"style", "class"}},
        {"acronym", new string[]    {"style", "class"}},
        {"del", new string[]        {"style", "class"}},
        {"ins", new string[]        {"style", "class"}}
      };

      _whitelistedTags = new HashSet<string>(_whitelist.Keys);
    }

    public string SanitizeHtml(string text)
    {
      var document = CreateHtmlDocument(text);
      if (document == null)
        return String.Empty;

      var rootNode = document.DocumentNode;

      CleanNodes(rootNode, _whitelistedTags);

      foreach (var whitelistedTagAttributesPair in _whitelist)
      {
        var nodes = (from node in rootNode.DescendantsAndSelf()
                     where node.Name == whitelistedTagAttributesPair.Key
                     select node);

        if (nodes == null)
          continue;

        foreach (var node in nodes)
        {
          if (!node.HasAttributes)
            continue;

          var attributes = node.Attributes.ToArray();
          for (var i = 0; i < attributes.Length; i++)
          { 
            if (!whitelistedTagAttributesPair.Value.Contains(attributes[i].Name))
              attributes[i].Remove();
            else
            {
              if (attributes[i].Name == "href" || attributes[i].Name == "src")
              {
                _sb.Clear();
                _sb.Append(attributes[i].Value.Trim());

                if (_sb.Length > 0)
                  _sb.Replace("\r", String.Empty)
                     .Replace("\n", String.Empty)
                     .Replace("javascript", String.Empty)
                     .Replace("eval", String.Empty);

                attributes[i].Value = _urlEncoder.Encode(_sb.ToString());
              }
              else
                attributes[i].Value = _htmlEncoder.Encode(attributes[i].Value);
            }              
          }
        }
      }
      return rootNode.InnerHtml;
    }

    public string StripHtml(string text)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    ///   Recursively delete nodes according to whitelist
    /// </summary>
    private void CleanNodes(HtmlNode node, HashSet<string> whitelistedTags)
    {
      if (node.NodeType == HtmlNodeType.Element)
      {
        if (!whitelistedTags.Contains(node.Name))
        {
          node.ParentNode.RemoveChild(node);
          return;
        }
      }

      if (node.HasChildNodes)
        CleanChildren(node, whitelistedTags);
    }

    /// <summary>
    ///   Deletes all children nodes according to whitelist
    /// </summary>
    private void CleanChildren(HtmlNode parent, HashSet<string> whitelistedTags)
    {
      for (var i = parent.ChildNodes.Count - 1; i >= 0; i--)
        CleanNodes(parent.ChildNodes[i], whitelistedTags);
    }

    /// <summary>
    ///   Creates HTML document from text
    /// </summary>
    private HtmlDocument CreateHtmlDocument(string source)
    {
      HtmlDocument html = new HtmlDocument();
      html.OptionFixNestedTags = true;
      html.OptionAutoCloseOnEnd = true;
      html.OptionDefaultStreamEncoding = Encoding.UTF8;

      html.LoadHtml(source);

      foreach (var node in html.DocumentNode.DescendantsAndSelf())
      {
        if (node.Name == "code")
        {
          HtmlAttribute[] attributes = node.Attributes.ToArray();
          foreach (var attribute in attributes)
          {
            if (attribute.Name != "style" && attribute.Name != "class")
              attribute.Remove();
          }

          node.InnerHtml = _htmlEncoder.Encode(node.InnerHtml);
        }
      }
      return html;
    }
  }
}
