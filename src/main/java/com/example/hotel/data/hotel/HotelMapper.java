package com.example.hotel.data.hotel;

import com.example.hotel.po.Hotel;
import com.example.hotel.vo.HotelVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HotelMapper {

    int insertHotel(Hotel hotel);

    List<HotelVO> selectAllHotel();

    HotelVO selectById(@Param("id") Integer id);

    int deleteById(@Param("id") Integer id);

    List<HotelVO> selectOrderedHotel(@Param("userId") Integer userId);

    List<HotelVO> selectManagedHotel(@Param("managerId") Integer managerId);

    int updateRate(@Param("id") Integer id,@Param("evaluatePeople") Integer evaluatePeople,@Param("rate") double rate);

    int deleteHotel(@Param("id") Integer id);

}
