;(function (window, undefined) {
  function Huaban() {
    //是否处于可绘画状态
    this.isDraw = false
    // 类型
    this.type = 'line'
    // 线的粗细
    this.lineWidth = 1
    //存储之前绘制对象
    this.imageData = null
    // 设置画板的颜色
    this.color = '#000'
    //画直线的函数
    this.lineFn = () => {
      ctx.lineTo(this.x, this.y)
      ctx.strokeStyle = this.color
      ctx.stroke()
    }
    // 画方框的函数
    this.rectFn = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      if (this.imageData !== null) {
        ctx.putImageData(this.imageData, 0, 0, 0, 0, canvas.width, canvas.height)
      }
      ctx.beginPath()
      ctx.lineWidth = this.lineWidth
      ctx.rect(this.x, this.y, this.xx - this.x, this.yy - this.y)
      ctx.stroke()
      ctx.strokeStyle = this.color
      ctx.closePath()
    }
    //画圆的函数
    this.arcFn = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      if (this.imageData !== null) {
        ctx.putImageData(this.imageData, 0, 0, 0, 0, canvas.width, canvas.height)
      }
      ctx.beginPath()
      ctx.lineWidth = this.lineWidth
      ctx.arc(this.x, this.y, Math.sqrt(Math.pow(this.xx - this.x, 2) + Math.pow(this.yy - this.y, 2)), 0, 2 * Math.PI, true)
      ctx.stroke()
      ctx.strokeStyle = this.color
      ctx.closePath()
    }
    // 橡皮的函数
    this.rubberFn = () => {
      ctx.beginPath()
      ctx.lineWidth = this.lineWidth
      ctx.arc(this.x, this.y, 10 * this.lineWidth, 0, 2 * Math.PI, true)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.closePath()
    }
    // 监听鼠标按下事件
    canvas.addEventListener('mousedown', e => {
      this.isDraw = true
      this.xx = e.pageX - canvas.offsetLeft
      this.yy = e.pageY - canvas.offsetTop
      if (this.type === 'line') {
        ctx.beginPath()
        ctx.lineWidth = this.lineWidth
        ctx.moveTo(this.xx, this.yy)
      }
    })
    // 监听鼠标抬起事件
    canvas.addEventListener('mouseup', () => {
      this.isDraw = false
      this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      if (this.type === 'line') {
        ctx.closePath()
      }
    })
    canvas.addEventListener('mousemove', e => {
      if (!this.isDraw) return
      this.x = e.pageX - canvas.offsetLeft
      this.y = e.pageY - canvas.offsetTop
      switch (this.type) {
        case 'line':
          this.lineFn()
          break
        case 'rect':
          this.rectFn()
          break
        case 'arc':
          this.arcFn()
          break
        case 'rubber':
          this.rubberFn()
          break
      }
    })
  }
  Huaban.prototype = {
    line() {
      this.type = 'line'
    },
    rect() {
      this.type = 'rect'
    },
    arc() {
      this.type = 'arc'
    },
    rubber() {
      this.type = 'rubber'
    },
    setColor(val) {
      this.color = val
    },
    xiline() {
      this.lineWidth = 1
    },
    normalline() {
      this.lineWidth = 2
    },
    culine() {
      this.lineWidth = 3
    }
  }
  window.Huaban = Huaban
})(window)
