namespace WebShop.Data.Entities
{
  using System;
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public class SaleOrder
  {
    public int Id { get; set; }
    public string CustomerId { get; set; }
    public bool Deleted { get; set; }
    public string DeletedBy { get; set; }
    public DateTime? DeletedOnUtc { get; set; }
    public DateTime DateCreatedUtc { get; set; }
    public DateTime? AcceptedOnUtc { get; set; }
    public DateTime? ShippedOnUtc { get; set; }
    public DateTime? DeliveredOnUtc { get; set; }
    public DateTime? CancelledOnUtc { get; set; }
    public List<OrderLine> OrderLines { get; set; } = new List<OrderLine>();
  }

  public class SaleOrderDto
  {
    public int Id { get; set; }
    public DateTime DateCreatedUtc { get; set; }
    public DateTime? AcceptedOnUtc { get; set; }
    public DateTime? ShippedOnUtc { get; set; }
    public DateTime? DeliveredOnUtc { get; set; }
    public DateTime? CancelledOnUtc { get; set; }
    public List<OrderLineDto> OrderLines { get; set; } = new List<OrderLineDto>();
  }
}