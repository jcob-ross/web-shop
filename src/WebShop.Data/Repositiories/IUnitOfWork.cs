namespace WebShop.Data.Repositiories
{
  using System;
  using System.Threading.Tasks;
  using Context;

  public interface IUnitOfWork : IDisposable
  {
    Task<int> CommitAsync();
    ICategoryRepository CategoryRepository { get; }
    ITagRepository TagRepository { get; }
    IProductRepository ProductRepository { get; }
    IManufacturerRepository ManufacturerRepository { get; }
    ISaleOrderRepository SaleOrderRepository { get; }
  }

  public sealed class UnitOfWork : IUnitOfWork
  {
    private bool _disposed;
    private readonly PosgresDbContext _context;
    private ICategoryRepository _categoryRepository;
    private ITagRepository _tagRepository;
    private IProductRepository _productRepository;
    private IManufacturerRepository _manufacturerRepository;
    private ISaleOrderRepository _saleOrderRepository;
    
    public UnitOfWork(PosgresDbContext context)
    {
      _context = context;
    }

    public Task<int> CommitAsync()
    {
      return _context.SaveChangesAsync();
    }

    public ICategoryRepository CategoryRepository => _categoryRepository ??  (_categoryRepository = new CategoryRepository(_context));
    public ITagRepository TagRepository => _tagRepository ?? (_tagRepository = new TagRepository(_context));
    public IProductRepository ProductRepository => _productRepository ?? (_productRepository = new ProductRepository(_context));
    public IManufacturerRepository ManufacturerRepository => _manufacturerRepository ?? (_manufacturerRepository = new ManufacturerRepository(_context));
    public ISaleOrderRepository SaleOrderRepository => _saleOrderRepository ?? (_saleOrderRepository = new SaleOrderRepository(_context));

    public void Dispose()
    {
      GC.SuppressFinalize(this);
      Dispose(true);
    }

    private void Dispose(bool disposing)
    {
      if (! _disposed)
      {
        if (disposing)
        {
          _context.Dispose();
        }

        _disposed = true;
      }
    }
  }
}