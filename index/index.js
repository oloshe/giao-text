const app = getApp()

Component({
  options: {
    pureDataPattern: /^_/ 
  },
  data: {
    _value: '',
  },
  
  methods:{
    onInput(event){
      console.log(event.detail)
      this.data._value = event.detail;
    },
    onFocus(event){
      console.log(event);
    },
    onBlur(event){
      console.log(event);
    },
    onConfirm(e){
      console.log(e);
      this.selectComponent('#custom').hideControl();
    }
  }
})
