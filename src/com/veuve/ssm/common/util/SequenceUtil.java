package com.veuve.ssm.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.*;
import java.util.Calendar;

/**
 * 根据时间生成唯一ID
 */
public class SequenceUtil {

    private static final Logger logger = LoggerFactory.getLogger(SequenceUtil.class);

    private static final FieldPosition HELPER_POSITION = new FieldPosition(0);

    private final static Format dateFormat = new SimpleDateFormat("YYYYMMddHHmmssS");

    private final static NumberFormat numberFormat = new DecimalFormat("0000");

    private static int seq = 0;

    private static final int MAX = 9999;

    public static synchronized String getSequenceNo(String tag) {
        Calendar rightNow = Calendar.getInstance();
        StringBuffer sb = new StringBuffer();
        dateFormat.format(rightNow.getTime(), sb, HELPER_POSITION);
        numberFormat.format(seq, sb, HELPER_POSITION);
        if (seq == MAX) {
            seq = 0;
        }else {
            seq++;
        }
        logger.info("The SQUENCE IS:" + sb.toString());
        return tag + sb.toString();
    }
}
