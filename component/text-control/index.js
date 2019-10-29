Component({

  externalClasses:['text-ctrl','btn-class','hover-class','collapse-class'],

  properties: {
    stringSet: String,
    separator: {
      type: String,
      value: ''
    },
    columns: {
      type: Number,
      value: 6
    },
    distinct: {
      type: Boolean,
      value: false
    },
    clearable:{
      type: Boolean,
      value: false
    },
    combo:{
      type: Boolean,
      value: true
    },
    random:{
      type: Boolean,
      value: false
    },
    controlKeep: {
      type: Boolean,
      value: false
    },
    hoverStayTime: {
      type: Number,
      value: 100
    },
    collapseLabel:{
      type: String,
      value: '收起'
    },
    collapseSlot:{
      type: Boolean,
      value: false
    },
    scroll:{
      type: Boolean,
      value: false,
    },

    /*==========================
      original input properties
    ============================*/
    value: String,
    placeholder: String,
    placeholderStyle: String,
    cursor: Number,
    placeholderClass: String,
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    holdKeyboard: {
      type: Boolean,
      value: false
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    password: {
      type: String,
      value: false
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    cursorSpacing: {
      type: Number,
      value: 0
    },
    maxlength: {
      type: Number,
      value: -1
    },
    type: {
      type: String,
      value: 'text'
    },
  },
  observers:{
    "_cursor": function(_cursor) {
      this.setData({
        _blurEvent: 1,
      })
    },
    "_text": function (_text) {
      if (this.focused) {
        this.setData({
          _tapEvent: 1,
        })
      } else {
        this._setText(this.data._cursor,this.data._text);
      }
    },
    "_blurEvent, _tapEvent": function(blur,tap) {
      if (blur === 1 && tap === 1) {
        this._setText(this.data._cursor,this.data._text);
      }
      setTimeout(() => {
        this.data._tapEvent = 0;
        this.data._blurEvent = 0;
      },200);
    }
  },
  options: {
    pureDataPattern: /^_/,
    multipleSlots: true 
  },
  data: {
    stringArray: [],
    _tapEvent: 0,
    _blurEvent: 0,
  },

  lifetimes: {
    attached() {
      let _obj = {};
      let array = this.data.stringSet.split(this.data.separator);
      let stringArray = [];

      if (this.data.distinct) {
        for (let i of array) {
          if (!_obj[i]) {
            stringArray.push(i)
            _obj[i] = 1;
          }
        }
        this.setData({ stringArray: stringArray });
      } else {
        this.setData({ stringArray: array });
      }

      this.focused = false;
    }
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.setData({ 
        value,
        showClear: this.ifShowClear(value),
       });
      this.triggerEvent('input', value);
      this.triggerEvent('change', value);
    },

    onFocus(event) {
      this.focused = true;
      this.showControl();
      this.triggerEvent('focus',event.detail);
    },

    onBlur(event) {
      let { cursor } = event.detail;
      this.focused = false;
      this.setData({ 
        _cursor: cursor,
      });
      this.triggerEvent('blur',cursor);
    },

    onConfirm(event) {
      this.hideControl();
      this.triggerEvent('confirm',event.detail);
    },

    onKeyboardheightchange(event) {
      this.triggerEvent('keyboardheightchange',event.detail);
    },

    onTap(event) {
      const { index } = event.currentTarget.dataset;
      let _text = this.data.stringArray[index];
      this.setData({ _text: _text });
    },

    onCollapseTap() {
      this.hideControl();
    },

    clear(){
      this.setData({
        value: '',
        showClear: false,
      })
    },

    _setText(cursor,text) {
      let value = this._insertString(this.data.value,cursor,text);
      if (this.data.combo && text.length == 2){
        cursor = this.data._cursor +  1;
      } else {
        cursor = this.data._cursor +  text.length;
      }
      this.setData({
        value,
        cursor,
        focus: true,
      });
      this.triggerEvent('change',value);
    },

    hideControl(){
      this.setData({
        showControl: false,
        showClear: false,
      })
    },

    ifShowClear(value){
      value = value === undefined ? this.data.value : value;
      return (this.data.clearable && this.focused && value);
    },

    showControl(){
      let showControl = this.data.stringArray.length > 0;
      if (showControl && this.data.random){
        this.data.stringArray.sort((a, b) => {
          return Math.random() > .5 ? -1 : 1;
        })
        this.setData({
          stringArray: this.data.stringArray
        })
      }

      this.setData({
        showControl,
        showClear: this.ifShowClear()
      })
    },

    _insertString(str,index,insertStr) {
      return str.slice(0,index) + insertStr + str.slice(index);
    }
  }
})
