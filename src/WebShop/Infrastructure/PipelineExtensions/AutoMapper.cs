﻿namespace WebShop.Infrastructure.PipelineExtensions
{
  using AutoMapper;
  using Data.Entities;
  using Microsoft.Extensions.DependencyInjection;

  public static partial class PipelineExtensions
  {
    public static void AddAutoMapper(this IServiceCollection services)
    {
      var mapperConfig = new MapperConfiguration(config =>
      {
        config.CreateMap<Product, ProductDto>().ForMember(dto => dto.Tags, cfg => cfg.Ignore());
        config.CreateMap<Tag, TagDto>().ForMember(dto => dto.ProductCount, cfg => cfg.Ignore());
        config.CreateMap<Manufacturer, ManufacturerDto>().ForMember(dto => dto.ProductCount, cfg => cfg.Ignore());
        config.CreateMap<Category, CategoryDto>();
        config.CreateMap<SaleOrder, SaleOrderDto>();
        config.CreateMap<OrderLine, OrderLineDto>();
      });

      mapperConfig.AssertConfigurationIsValid();

      var mapper = mapperConfig.CreateMapper();
      services.AddSingleton<IMapper>(mapper);
    }
  }
}