package com.veuve.ssm.common.util;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;



/**
 * 日期处理工具类
 */

public class DateUtil {

    private static Logger logger = LoggerFactory.getLogger(DateUtil.class);

    /** 日期格式yyyy-MM字符串常量 */
    private static final String MONTH_FORMAT = "yyyy-MM";

    /** 日期格式yyyy-MM-dd字符串常量 */
    private static final String DATE_FORMAT = "yyyy-MM-dd";

    /** 日期格式HH:mm:ss字符串常量 */
    private static final String HOUR_FORMAT = "HH:mm:ss";

    /** 日期格式yyyy-MM-dd HH:mm:ss字符串常量 */
    private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /** 某天开始时分秒字符串常量  00:00:00 */
    private static final String DAY_BEGIN_STRING_HHMMSS = " 00:00:00";

    /**  某天结束时分秒字符串常量  23:59:59  */
    public static final String DAY_END_STRING_HHMMSS = " 23:59:59";

    private static SimpleDateFormat sdf_date_format = new SimpleDateFormat(DATE_FORMAT);

    private static SimpleDateFormat sdf_hour_format = new SimpleDateFormat(HOUR_FORMAT);

    private static SimpleDateFormat sdf_datetime_format = new SimpleDateFormat(DATETIME_FORMAT);

    public DateUtil() {
    }

    /**
     * 获得服务器当前日期及时间，以格式为：yyyy-MM-dd HH:mm:ss的日期字符串形式返回
     */
    public static String getDateTime() {
        try {
            return sdf_datetime_format.format(new Date());
        } catch (Exception e) {
            logger.debug("DateUtil.getDateTime():" + e.getMessage());
            return "";
        }
    }

    /**
     * 获得服务器当前日期，以格式为：yyyy-MM-dd的日期字符串形式返回
     */
    public static String getDate() {
        try {
            return sdf_date_format.format(Calendar.getInstance().getTime());
        } catch (Exception e) {
            logger.debug("DateUtil.getDate():" + e.getMessage());
            return "";
        }
    }

    /**
     * 获得服务器当前时间，以格式为：HH:mm:ss的日期字符串形式返回
     */
    public static String getTime() {
        String temp = " ";
        try {
            temp += sdf_hour_format.format(Calendar.getInstance().getTime());
            return temp;
        } catch (Exception e) {
            logger.debug("DateUtil.getTime():" + e.getMessage());
            return "";
        }
    }

    /**
     * 统计时开始日期的默认值
     */
    public static String getStartDate() {
        try {
            return getYear() + "-01-01";
        } catch (Exception e) {
            logger.debug("DateUtil.getStartDate():" + e.getMessage());
            return "";
        }
    }

    /**
     * 统计时结束日期的默认值
     */
    public static String getEndDate() {
        try {
            return getDate();
        } catch (Exception e) {
            logger.debug("DateUtil.getEndDate():" + e.getMessage());
            return "";
        }
    }

    /**
     * 获得服务器当前日期的年份
     */
    public static String getYear() {
        try {
            return String.valueOf(Calendar.getInstance().get(Calendar.YEAR));
        } catch (Exception e) {
            logger.debug("DateUtil.getYear():" + e.getMessage());
            return "";
        }
    }

    /**
     * 获得服务器当前日期的月份
     */
    public static String getMonth() {
        try {
            java.text.DecimalFormat df = new java.text.DecimalFormat();
            df.applyPattern("00;00");
            return df.format((Calendar.getInstance().get(Calendar.MONTH) + 1));
        } catch (Exception e) {
            logger.debug("DateUtil.getMonth():" + e.getMessage());
            return "";
        }
    }

    /**
     * 获得服务器在当前月中天数
     */
    public static String getDay() {
        try {
            return String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
        } catch (Exception e) {
            logger.debug("DateUtil.getDay():" + e.getMessage());
            return "";
        }
    }

    /**
     * 比较两个日期相差的天数
     */
    public static int getMargin(String date1, String date2) {
        int margin;
        try {
            ParsePosition pos = new ParsePosition(0);
            ParsePosition pos1 = new ParsePosition(0);
            Date dt1 = sdf_date_format.parse(date1, pos);
            Date dt2 = sdf_date_format.parse(date2, pos1);
            long l = dt1.getTime() - dt2.getTime();
            margin = (int) (l / (24 * 60 * 60 * 1000));
            return margin;
        } catch (Exception e) {
            logger.debug("DateUtil.getMargin():" + e.toString());
            return 0;
        }
    }

    /**
     * 比较两个日期相差的天数
     */
    public static double getDoubleMargin(String date1, String date2) {
        double margin;
        try {
            ParsePosition pos = new ParsePosition(0);
            ParsePosition pos1 = new ParsePosition(0);
            Date dt1 = sdf_datetime_format.parse(date1, pos);
            Date dt2 = sdf_datetime_format.parse(date2, pos1);
            long l = dt1.getTime() - dt2.getTime();
            margin = (l / (24 * 60 * 60 * 1000.00));
            return margin;
        } catch (Exception e) {
            logger.debug("DateUtil.getMargin():" + e.toString());
            return 0;
        }
    }

    /**
     * 比较两个日期相差的月数
     */
    public static int getMonthMargin(String date1, String date2) {
        int margin;
        try {
            margin = (Integer.parseInt(date2.substring(0, 4)) - Integer.parseInt(date1.substring(0, 4))) * 12;
            margin += (Integer.parseInt(date2.substring(4, 7).replaceAll("-0",
                    "-")) - Integer.parseInt(date1.substring(4, 7).replaceAll("-0", "-")));
            return margin;
        } catch (Exception e) {
            logger.debug("DateUtil.getMargin():" + e.toString());
            return 0;
        }
    }

    /**
     * 返回日期加X天后的日期
     */
    public static String addDay(String date, int i) {
        try {
            GregorianCalendar gCal = new GregorianCalendar(
                    Integer.parseInt(date.substring(0, 4)),
                    Integer.parseInt(date.substring(5, 7)) - 1,
                    Integer.parseInt(date.substring(8, 10)));
            gCal.add(GregorianCalendar.DATE, i);
            return sdf_date_format.format(gCal.getTime());
        } catch (Exception e) {
            logger.debug("DateUtil.addDay():" + e.toString());
            return getDate();
        }
    }

    /**
     * 返回日期加X月后的日期
     */
    public static String addMonth(String date, int i) {
        try {
            GregorianCalendar gCal = new GregorianCalendar(
                    Integer.parseInt(date.substring(0, 4)),
                    Integer.parseInt(date.substring(5, 7)) - 1,
                    Integer.parseInt(date.substring(8, 10)));
            gCal.add(GregorianCalendar.MONTH, i);
            return sdf_date_format.format(gCal.getTime());
        } catch (Exception e) {
            logger.debug("DateUtil.addMonth():" + e.toString());
            return getDate();
        }
    }

    /**
     * 返回日期加X年后的日期
     */
    public static String addYear(String date, int i) {
        try {
            GregorianCalendar gCal = new GregorianCalendar(
                    Integer.parseInt(date.substring(0, 4)),
                    Integer.parseInt(date.substring(5, 7)) - 1,
                    Integer.parseInt(date.substring(8, 10)));
            gCal.add(GregorianCalendar.YEAR, i);
            return sdf_date_format.format(gCal.getTime());
        } catch (Exception e) {
            logger.debug("DateUtil.addYear():" + e.toString());
            return "";
        }
    }

    /**
     * 返回某年某月中的最大天
     */
    public static int getMaxDay(int iyear, int imonth) {
        int day = 0;
        try {
            if (imonth == 1 || imonth == 3 || imonth == 5 || imonth == 7
                    || imonth == 8 || imonth == 10 || imonth == 12) {
                day = 31;
            } else if (imonth == 4 || imonth == 6 || imonth == 9 || imonth == 11) {
                day = 30;
            } else if ((0 == (iyear % 4)) && (0 != (iyear % 100)) || (0 == (iyear % 400))) {
                day = 29;
            } else {
                day = 28;
            }
            return day;
        } catch (Exception e) {
            logger.debug("DateUtil.getMonthDay():" + e.toString());
            return 1;
        }
    }

    /**
     * 将日期类转换成指定格式的字符串形式
     */
    public static final String getDateTime(String aMask, Date aDate) {
        SimpleDateFormat df = null;
        String returnValue = "";

        if (aDate == null) {
            logger.error("aDate is null!");
        } else {
            df = new SimpleDateFormat(aMask);
            returnValue = df.format(aDate);
        }
        return (returnValue);
    }

    /**
     * 将日期字符串按指定格式转换成日期类型
     */
    public static final Date convertStringToDate(String aMask, String strDate)
            throws ParseException {
        SimpleDateFormat df = null;
        Date date = null;
        df = new SimpleDateFormat(aMask);

        if (logger.isDebugEnabled()) {
            logger.debug("converting '" + strDate + "' to date with mask '" + aMask + "'");
        }
        try {
            date = df.parse(strDate);
        } catch (ParseException pe) {
            logger.error("ParseException: " + pe);
            throw pe;
        }
        return (date);
    }


    /**
     * 返回一个JAVA简单类型的日期字符串
     */
    public static String getSimpleDateFormat() {
        SimpleDateFormat formatter = new SimpleDateFormat();
        String NDateTime = formatter.format(new Date());
        return NDateTime;
    }

    /**
     * 为查询日期添加最小时间
     */
    @SuppressWarnings("deprecation")
    public static Date addStartTime(Date param) {
        Date date = param;
        try {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            return date;
        } catch (Exception ex) {
            return date;
        }
    }

    /**
     * 为查询日期添加最大时间
     */
    @SuppressWarnings("deprecation")
    public static Date addEndTime(Date param) {
        Date date = param;
        try {
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(0);
            return date;
        } catch (Exception ex) {
            return date;
        }
    }

    /**
     * 返回系统现在年份中指定月份的天数
     */
    @SuppressWarnings("deprecation")
    public static String getMonthLastDay(int month) {
        Date date = new Date();
        int[][] day = { { 0, 30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 },
                { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 } };
        int year = date.getYear() + 1900;
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            return day[1][month] + "";
        } else {
            return day[0][month] + "";
        }
    }

    /**
     * 返回指定年份中指定月份的天数
     */
    public static String getMonthLastDay(int year, int month) {
        int[][] day = { { 0, 30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 },
                { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 } };
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            return day[1][month] + "";
        } else {
            return day[0][month] + "";
        }
    }

    /**
     * 判断是平年还是闰年
     */
    public static boolean isLeapyear(int year) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400) == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 取得当前时间的日戳
     */
    @SuppressWarnings("deprecation")
    public static String getTimestamp() {
        Date date = Calendar.getInstance().getTime();
        String timestamp = "" + (date.getYear() + 1900) + date.getMonth()
                + date.getDate() + date.getMinutes() + date.getSeconds()
                + date.getTime();
        return timestamp;
    }

    /**
     * 取得指定时间的日戳
     */
    @SuppressWarnings("deprecation")
    public static String getTimestamp(Date date) {
        String timestamp = "" + (date.getYear() + 1900) + date.getMonth()
                + date.getDate() + date.getMinutes() + date.getSeconds()
                + date.getTime();
        return timestamp;
    }

    public static void main(String[] args) {
        System.out.println(getYear() + "|" + getMonth() + "|" + getDate());
    }
}