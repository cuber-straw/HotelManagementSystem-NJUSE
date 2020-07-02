package com.example.hotel.blImpl.coupon;

import com.example.hotel.bl.coupon.CouponMatchStrategy;
import com.example.hotel.po.Coupon;
import com.example.hotel.vo.OrderVO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TimeCouponStrategyImpl implements CouponMatchStrategy {


    /**
     * 判断某个订单是否满足某种限时优惠策略
     * @param orderVO
     * @return
     */
    @Override
    public boolean isMatch(OrderVO orderVO, Coupon coupon) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        if (coupon.getCouponType() == 4 && LocalDateTime.parse(orderVO.getCheckInDate(), dtf).isAfter(coupon.getStartTime())  &&LocalDateTime.parse(orderVO.getCheckOutDate(), dtf).isBefore(coupon.getEndTime())) {
            return true;
        }
        return false;
    }
}
