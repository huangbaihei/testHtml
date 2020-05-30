let isDone: boolean = false

let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

// let name: string = "bob"
// name = "smith"

// let name: string = `Gene`
let aget: number = 37
// let sentence: string = `Hello, my name is ${name}`

// let sentence: string = "Hello, my name is " + name + ".\n\n" + "I'll be" + (age + 1) + " year old next month"

// let list: number[] = [1, 2, 3]

let list: Array<number> = [1, 2, 3]

// Declare a tuple type
let x: [string, number]
// Initialize it
x = ['hello', 10] // OK
// Initialize it incorrectly
// x = [10, 'hello'] // Error

console.log(x[0].substr(1)) // OK
// console.log(x[1].substr(1)) // Error, 'number' does not have 'substr'

// x[3] = 'world' // OK, 字符串可以赋值给(string | number)类型
// console.log(x[5].toString()) // OK, 'string' 和 'number'都有 toString
// x[6] = true // Error, 布尔不是(string | number)类型

enum Color {Red, Green, Blue}
let c: Color = Color.Green

// enum Color {Red = 1, Green, Blue}
// let c: Color = Color.Green

// enum Color { Red = 1, Green = 2, Blue = 4 }
// let c: Color = Color.Green

// enum Color { Red=1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName) // 显示'Green'因为上面代码里它的值是2

let notSure: any = 4
notSure = "maybe a string instead"
notSure = false // okay, definitely a boolean

// let notSure: any = 4
notSure.ifItExists() // okay, ifItExists might exist at runtime
notSure.toFixed() // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4
// prettySure.toFixed() // Error: Property 'toFixed' doesn't exist on type 'Object'

// let list: any[] = [1, true, "free"]
list[1] = 100

function warnUser(): void {
  console.log("This is my warning message")
}

let unusable: void = undefined

// Not much else we can assign to these variables!
let u: undefined = undefined
let n: null = null

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {

  }
}

declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

// create(42) // Error
// create("string") // Error
// create(false) // Error
create(undefined) // Error

let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length

// let someValue: any = "this is a string"
// let strLength: number = (someValue as string).length












