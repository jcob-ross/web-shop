namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Entities;

  public interface ITagRepository
  {
    Task<Tag> GetTagByIdAsync(int id);
    Task<List<Tag>> GetTagsByCategoryIdAsync(int categoryId);
    Task<Tag> CreateAsync(TagDto model);
    Task<Tag> UpdateAsync(Tag item, TagDto model);
    Task DeleteAsync(int id);
  }

  public interface ICategoryRepository
  {
    Task<List<ProductCategory>> ListByGroupAsync(int groupId);
    Task<List<ProductCategory>> ListAsync(bool includeTags, bool includeManufacturers);
    Task<List<CategoryMetadataDto>> GetMetadataByGroupAsync(int groupId);
    Task<ProductCategory> GetCategoryByIdAsync(int id);
    Task<ProductCategory> CreateAsync(ProductCategoryDto model);
    Task<ProductCategory> UpdateAsync(ProductCategory item, ProductCategoryDto model);
    Task DeleteAsync(int id);
  }

  public interface IProductRepository
  {
    Task<List<Product>> SearchAsync(string term, int limit);
    Task<PagedSearchResult> PagedSearchAsync(PagedSearchModel searchModel);
    Task<Product> GetProductByIdAsync(int id);
    Task<Product> CreateAsync(ProductDto model);
    Task<Product> UpdateAsync(Product item, ProductDto model);
    Task DeleteAsync(int id);
  }

  public interface IManufacturerRepository
  {
    Task<Manufacturer> GetManufacturerByIdAsync(int id);
    Task<List<Manufacturer>> GetManufacturersByCategoryId(int categoryId, int categoryGroupId);
    Task<Manufacturer> CreateAsync(ManufacturerDto model);
    Task<Manufacturer> UpdateAsync(Manufacturer item, ManufacturerDto model);
    Task DeleteAsync(int id);
  }

  public interface ISaleOrderRepository
  {
    Task<SaleOrder> GetOrderByIdAsync(int id);
    Task<List<SaleOrder>> ListOrdersForUserAsync(string userId);
    Task<List<SaleOrder>> ListOrdersAsync(TimeSpan maxAge, bool includeAccepted, bool includeShipped);
    Task<SaleOrder> CreateAsync(SaleOrderDto model);
    Task<SaleOrder> UpdateAsync(SaleOrder item, SaleOrderDto model);
    Task DeleteAsync(int id);
  }
}