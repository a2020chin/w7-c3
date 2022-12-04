//新增資料
const formElement = document.querySelector('.js_form')
let originData = {}
let data = {}
let c3Obj = {}
let c3Array = []

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  let name = formElement[0].value.trim()
  let imgUrl = formElement[1].value.trim()
  let area = formElement[2].value.trim()
  let price = formElement[3].value.trim()
  let group = formElement[4].value.trim()
  let rate = formElement[5].value.trim()
  let description = formElement[6].value.trim()

  const error_name = document.querySelector('.js_error_name')
  const error_imgUrl = document.querySelector('.js_error_imgUrl')
  const error_area = document.querySelector('.js_error_area')
  const error_price = document.querySelector('.js_error_price')
  const error_group = document.querySelector('.js_error_group')
  const error_rate = document.querySelector('.js_error_rate')

  const reFilter = document.querySelector('.js_filterGroup')

  if(!formElement[0].validity.valid){
    error_name.innerHTML = `套票名稱不能為空`
  }else{
    error_name.innerHTML = ''
  }
  if(!formElement[1].validity.valid){
    if(formElement[1].value == ''){
      error_imgUrl.innerHTML = `圖片網址不能為空`
    }else{
      error_imgUrl.innerHTML = `圖片網址格式錯誤`
    }
  }else{
    error_imgUrl.innerHTML = ''
  }
  if(!formElement[2].validity.valid){
    error_area.innerHTML = `請選擇景點地區`
  }else{
    error_area.innerHTML = ''
  }
  if(!formElement[3].validity.valid){
    if(formElement[3].value == ''){
      error_price.innerHTML = `請輸入套票金額`
    }else{
      error_price.innerHTML = `套票金額格式錯誤`
    }
  }else{
    error_price.innerHTML = ''
  }
  if(!formElement[4].validity.valid){
    if(formElement[4].value == ''){
      error_group.innerHTML = `請輸入套票組數`
    }else{
      error_group.innerHTML = `套票組數格式錯誤`
    }
  }else{
    error_group.innerHTML = ''
  }
  if(!formElement[5].validity.valid){
    if(formElement[5].value == ''){
      error_rate.innerHTML = `請輸入套票星級`
    }else{
      error_rate.innerHTML = `套票星級格式錯誤`
    }
  }else{
    error_rate.innerHTML = ''
  }

  if(formElement[0].validity.valid &&
    formElement[1].validity.valid &&
    formElement[2].validity.valid &&
    formElement[3].validity.valid &&
    formElement[4].validity.valid &&
    formElement[5].validity.valid &&
    formElement[6].validity.valid){
    console.log(data)



    console.log(name,imgUrl,area,price,group,rate,description);

    originData.push({
        "id": data.length,
        name,
        imgUrl,
        area,
        description,
        group,
        price,
        rate,
    })
    formElement.reset()
    error_name.innerHTML = ''
    error_imgUrl.innerHTML = ''
    error_area.innerHTML = ''
    error_price.innerHTML = ''
    error_group.innerHTML = ''
    error_rate.innerHTML = ''
    reFilter.value = '全部地區'
    console.log(originData)
    render(originData);
    c3Data()
  }
})

//渲染畫面
const init = () =>{
  const _url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
  axios.get(_url).then((res) => {
    originData = res.data.data
    data = originData
    render(originData)
    c3Data()
  }).catch(()=>{
    console.log('error')
  })
}
init();


const render = (arr) => {
  const ticketList = document.querySelector('.js_ticketList')
  const filterNum = document.querySelector('.js_filter')
  let str = ''
  arr.forEach((item)=>{

    let content = `
      <li
        class="col-span-4 bg-white shadow-[0px_3px_6px_#00000029] rounded"
      >
        <div class="relative">
          <img
            class="block w-full h-[180px] object-cover rounded-t"
            src="${item.imgUrl}"
            alt=""
          />
          <div
            class="absolute px-5 py-2 bg-secondary text-white text-xl rounded-r top-0 -translate-y-1/4"
          >
          ${item.area}
          </div>
          <div
            class="absolute px-2 py-[5px] bg-primary text-white rounded-r bottom-0 translate-y-1/2"
          >
          ${item.rate}
          </div>
        </div>
        <div
          class="flex flex-col justify-between h-[calc(100%_-_180px)] p-5"
        >
          <div>
            <h3
              class="text-primary text-2xl font-medium pb-1 mb-4 border-b-2 border-b-primary"
            >
            ${item.name}
            </h3>
            <p class="mb-5">
            ${item.description}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-primary">
              <span class="material-symbols-outlined align-middle mr-[6px]">
                error
              </span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="flex items-center text-primary">
              TWD
              <span
                class="font-roboto text-[32px] ml-1"
                id="ticketCard-price"
              >
                $${item.price}
              </span>
            </p>
          </div>
        </div>
      </li>
    `
    str += content
  })
  ticketList.innerHTML = str
  filterNum.innerHTML = `搜尋資料為 ${arr.length} 筆`
}


const filterGroup = document.querySelector('.js_filterGroup')
filterGroup.addEventListener('change', (e) => {
  if(e.target.value == '全部地區'){init()}else{
    const newData = data.filter((item) => {
      return item.area == e.target.value
    })
    render(newData)
  }
})

const c3Data = () => {
  originData.forEach((item)=>{
    c3Obj[item.area] ? c3Obj[item.area] += 1 : c3Obj[item.area] = 1
  })

  const chart = c3.generate({
    bindto: '#chart',
    size: {
      height: 250,
      width: 480
    },
    data: {
      columns: Object.entries(c3Obj),
      type : 'donut',
    },
    
    donut: { 
      label: {
        show: false
      },
      title: "套票地區比重",
      width: 20 
    }
  });
}

