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
    showClear:{
      type: Boolean,
      value: false
    },
    random:{
      type: Boolean,
      value: false
    },
    controlKeep: {
      type: Boolean,
      value: false
    },
    useSlot: {
      type: Boolean,
      value: false,
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
    btnLabel:{
      type: String,
      value: '确定',
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
    maxLength: {
      type: Number,
      value: -1
    },
    type: {
      type: String,
      value: 'text'
    },
  },

  options: {
    pureDataPattern: /^_/,
    multipleSlots: true 
  },
  data: {
    stringArray: [],
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
    }
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.setData({ value });
      this.triggerEvent('input', value);
    },

    onFocus(event) {
      this.showControl();
      this.triggerEvent('focus',event.detail);
    },

    onBlur(event) {
      let { cursor } = event.detail;
      this.data._cursor = cursor;

      if (this._tapCallback) {
        this._tapCallback(cursor);
      } else {
        this._blurCallback = res => {
          this._setText(cursor,res);
          this._blurCallback = null;
        }
      }
      this.triggerEvent('blur',event.detail);
    },

    onConfirm(event) {
      this.setData({
        showControl: false,
      })
      this.triggerEvent('confirm',event.detail);
    },

    onKeyboardheightchange() {
      this.triggerEvent('keyboardheightchange',event.detail);
    },

    onTap(event) {
      const { index } = event.currentTarget.dataset;
      let _text = this.data.stringArray[index];
      this.data._text = _text;

      if (this._blurCallback) {
        this._blurCallback(_text);
      } else {
        this._tapCallback = res => {
          this._setText(res,_text);
          this._tapCallback = null;
        }
      }
    },

    onCollapseTap() {
      this.hideControl();
    },

    clear(){
      this.setData({
        value: '',
      })
    },

    _setText(cursor,text) {
      let value = this._insertString(this.data.value,cursor,text);
      this.setData({ 
        value,
        cursor: this.data._cursor + text.length,
        focus: true,
        _cursor: null,
        _text: null,
      });
    },

    hideControl(){
      this.setData({
        showControl: false,
      })
    },

    showControl(){
      if (this.data.random){
        this.data.stringArray.sort((a, b) => {
          return Math.random() > .5 ? -1 : 1;
        })
        this.setData({
          stringArray: this.data.stringArray
        })
      }

      this.setData({
        showControl: true,
      })
    },

    _insertString(str,index,insertStr) {
      if(index == 0) {
        return insertStr.concat(str);
      } else {
        return str.slice(0,index) + insertStr + str.slice(index);
      }
    }


  }
})
