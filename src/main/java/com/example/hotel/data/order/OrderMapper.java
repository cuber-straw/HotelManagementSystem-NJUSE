package com.example.hotel.data.order;

import com.example.hotel.po.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: chenyizong
 * @Date: 2020-03-04
 */
@Mapper
@Repository
public interface OrderMapper {

    int addOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getUserOrders(@Param("userid") int userid);

    int annulOrder(@Param("orderId") int orderId);

    Order getOrderById(@Param("orderid") int orderid);

    List<Order> getManagedOrders(@Param("managerId") int managerId);

    int updateOrderState(@Param("orderId") int orderId,@Param("orderState") String orderState);

}
