export default class Slotarr {
  $amount: HTMLInputElement
  $input: HTMLTextAreaElement
  $output: HTMLDivElement
  $execute: HTMLButtonElement
  $juuRen: HTMLButtonElement
  defaultSlotAmount: number

  constructor() {
    this.$amount = document.querySelector('#amount') as HTMLInputElement
    this.$input = document.querySelector('#input') as HTMLTextAreaElement
    this.$output = document.querySelector('#output') as HTMLDivElement
    this.$execute = document.querySelector('#execute') as HTMLButtonElement
    this.$juuRen = document.querySelector('#juuRen') as HTMLButtonElement
    this.defaultSlotAmount = 3
  }

  get idx() {
    return Math.floor(Math.random() * this.slotAmount)
  }

  get isSameAmountOfItemToSlot() {
    return this.$amount.checked
  }

  get seedArray() {
    return this.$input.value.split(' ')
  }

  get slotAmount() {
    return this.isSameAmountOfItemToSlot ? this.seedArray.length : this.defaultSlotAmount
  }

  get shuffledArray() {
    let array: string[] = []

    for (let i=0; i<this.slotAmount; i++) {
      array.push(this.seedArray[this.idx]);
    }

    return array
  }

  get shuffled10Array() {
    let array10: string[][] = []
    
    for (let i=0; i<10; i++) {
      let array1: string[] = []
      for (let i=0; i<this.slotAmount; i++) {
        array1.push(this.seedArray[this.idx]);
      }
      array10.push(array1)
    }

    return array10
  }

  isEqual(target: string[]) {
    for (let i=0; i<this.slotAmount; i++) {
      if (target[0] !== target[i]) {
        return false
      }
    }
    return true
  }

  setResult(result: string[]) {
    this.$output.textContent = result.join(' / ')
  }

  setJuuRenResult(result: string[][]) {
    this.$output.textContent = ''
    result.forEach((one: string[], i: number, arr: string[][]) => {
      let $p: HTMLParagraphElement = document.createElement('p')
      $p.textContent = i+1 + ': ' + one.join(' / ')

      if (this.isEqual(one)) {
        $p.classList.add('u-equal')
      }

      this.$output.appendChild($p)
    })
  }

  dispatch() {
    this.$execute.addEventListener('click', (ev: Event) => {
      this.setResult(this.shuffledArray)
    })
    this.$juuRen.addEventListener('click', (ev: Event) => {
      this.setJuuRenResult(this.shuffled10Array)
    })
  }
}