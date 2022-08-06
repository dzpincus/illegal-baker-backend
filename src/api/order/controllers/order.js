'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx)
    let order = JSON.parse(ctx.request.body.data);
    console.log(order)
    await strapi.plugin('email-designer')
    .service('email')
    .sendTemplatedEmail({
      to: order.order_data.contactInfo.email,
    },
    {
      templateReferenceId: 1,
      subject: 'Illegal Baker - Order Confirmation'
    }, 
    {
      order: order,
      addressLabel: order.order_data.delivery.type === "pickup" ? "Pickup Address" : "Delivery Address",
      address: order.order_data.delivery.type === "pickup" ? order.order_data.delivery.selectedPickupLocation : order.order_data.delivery.deliveryAddress,
      payment: order.order_data.payment.type === "cash" ? "Cash on order pickup" : "Paid in full",
      orderId: response.data.id
    })

    await strapi.plugin('email-designer')
    .service('email')
    .sendTemplatedEmail({
      to: 'amy@illegalbaker.com',
    },
    {
      templateReferenceId: 2,
      subject: 'New Order!'
    }, 
    {
      order: order,
      addressLabel: order.order_data.delivery.type === "pickup" ? "Pickup Address" : "Delivery Address",
      address: order.order_data.delivery.type === "pickup" ? order.order_data.delivery.selectedPickupLocation : order.order_data.delivery.deliveryAddress,
      payment: order.order_data.payment.type === "cash" ? "Cash on order pickup" : "Paid in full",
      orderId: response.data.id
    })
    return response;
  }
}));
