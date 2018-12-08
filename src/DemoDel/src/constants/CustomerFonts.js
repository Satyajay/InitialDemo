/*
 * @file: Fonts.js
 * @description: App Fonts
 * @date: 03.01.2018
 * @author: Ankush Rishi
 * */

'use-strict';
import BaseStyle from './BaseStyle';
import { Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from "../utilities/ResponsiveFonts";

var CustomerFonts = {
    normal:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Regular',
    },
    bold:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Bold',
    },
    small:{
      fontSize:moderateScale(12),
      fontFamily:'OpenSans-Regular',
    },
    small_13:{
      fontSize:moderateScale(13),
      fontFamily:'OpenSans-Regular',
    },
    semibold:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Semibold',
    },
    content:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Regular',
    },
    contentBold:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Bold',
    },
    TopHeader:{
      fontSize:moderateScale(14),
      fontFamily:'OpenSans-Semibold',
    },
    BigSize:{
      fontSize:moderateScale(16),
      fontFamily:'OpenSans-Semibold',
    },

}

module.exports = CustomerFonts
