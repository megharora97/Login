import React, { Component } from 'react';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const margin = height / 80;
const borderradius = height / 150
const UpArror = 'chevron-up'
const DownArror = 'chevron-down'
const TypeArrow = 'entypo'
const SideArror = 'chevron-right'
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//Api's
const Login = 'https:\\api.production.wallet.ulis.co.uk\\login/Login'
const Language = 'https://api.production.wallet.ulis.co.uk\/masters/Language'
const Service = 'https:\\api.production.wallet.ulis.co.uk\\/masters/Service'


export default {
      margin: margin,
      borderradius: borderradius,
      UpArror: UpArror,
      DownArror: DownArror,
      TypeArrow: TypeArrow,
      SideArror: SideArror,
      Login: Login,
      Language: Language,
      EmailRegex: EmailRegex,
      Service: Service,
}