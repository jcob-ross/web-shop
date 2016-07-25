namespace WebShop.Data.Entities
{
  using System;
  using System.Collections.Generic;

  public sealed class SaleOrder
  {
    public int Id { get; set; }
    public string CustomerId { get; set; }
    public bool Deleted { get; set; }
    public string DeletedBy { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset? AcceptedOn { get; set; }
    public DateTimeOffset? ShippedOn { get; set; }
    public DateTimeOffset? DeliveredOn { get; set; }
    public DateTimeOffset? CancelledOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }
    public HashSet<OrderLine> OrderLines { get; set; } = new HashSet<OrderLine>();
  }

  public sealed class SaleOrderDto
  {
    public int Id { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset? AcceptedOn { get; set; }
    public DateTimeOffset? ShippedOn { get; set; }
    public DateTimeOffset? DeliveredOn { get; set; }
    public DateTimeOffset? CancelledOn { get; set; }
    public HashSet<OrderLineDto> OrderLines { get; set; } = new HashSet<OrderLineDto>();
  }
}