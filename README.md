# Getting Started with Create React App

## 環境構築手順

カレントディレクトリで以下のコマンドを実行して、テンプレートを作成した。

```bash
$ yarn create react-app . --template typescript
```

### Eslint

```bash
$ yarn add -D eslint @typescript-eslint/{parser,eslint-plugin} prettier eslint-config-prettier eslint-plugin-react
```

### Storybook

$ https://github.com/storybookjs/presets/tree/master/packages/preset-create-react-app

```bash
$ yarn add -D @storybook/preset-create-react-app
```

## 実装中のメモ

### JSX と React 要素との対応

React でコンポーネントを作成している最中に使用している JSX は Babel を通して React の表現にトランスパイルされる。

例えば以下のような JSX を考える

```js
<div className="shopping-list">
  <h1>Shopping List for {props.name}</h1>
  <ul>
    <li>Instagram</li>
    <li>WhatsApp</li>
    <li>Oculus</li>
  </ul>
</div>
```

これは以下のようなコードにコンパイルされる。

```js
React.createElement(
  'div',
  {
    className: 'shopping-list',
  },
  React.createElement('h1', null, 'Shopping List for ', props.name),
  React.createElement(
    'ul',
    null,
    React.createElement('li', null, 'Instagram'),
    React.createElement('li', null, 'WhatsApp'),
    React.createElement('li', null, 'Oculus'),
  ),
);
```

### TypeScript への対応

https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

TypeScript に対応するために `index.js` から `index.tsx` に変更することで、特定の関数での引数の型が `any` 型だと判断されて警告が発生してしまいます。

そこで以下のように型情報を追加します。

```js
class Board extends React.Component {
  // renderSquare(i) {
  renderSquare(i: number) {
    return <Square />;
  }
}
```

### Props の渡し方

そのまま Props を渡すと以下のようなエラーが生じてしまう。

```js
class Square extends React.Component {
  render() {
    // Property 'value' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'
    return <button className="square">{this.props.value}</button>;
  }
}

class Board extends React.Component {
  renderSquare(i: number) {
    return <Square value={i} />;
  }
}
```

TypeScript を使用する場合には、親のコンポーネントから渡される Props に対してインターフェースを定義する必要がある。

```js
interface SquarePropsInterface {
  value: number;
}

class Square extends React.Component<SquarePropsInterface> {
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}
```

### コンストラクタを使った初期化

JavaScript でクラスを使用する場合には、それがサブクラスの場合はコンストラクタで親クラスの `super` を呼ぶ必要があるため、以下のように渡された `props` を親クラスにも渡している。

なお `props` には型を指定するようにしておく。

```js
class Square extends React.Component<SquarePropsInterface> {
  constructor(props: SquarePropsInterface) {
    super(props);
    this.state = { value: null };
  }
}
```

### コンポーネントでの状態保持

React では以下のように `state` に保持している状態を他の関数から呼び出すことが可能です。

```js
class Square extends React.Component<SquarePropsInterface> {
  constructor(props: SquarePropsInterface) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'X' })}>
        {this.state.value}
      </button>
    );
  }
}
```

しかし TypeScript で実装を行っている場合には、Props の場合と同様に状態管理用のインターフェースも用意する必要がある。

`React.Component` では以下のようなジェネリクスが提供されているので、クラス宣言時に Props と State のインターフェースを指定する必要がある。

```js
class React.Component<P = {}, S = {}, SS = any>
```

今回は `value` 変数の状態を管理するだけなので以下のように記載することが可能である。

```js
interface SquareStateInterface {
  value: string;
}

class Square extends React.Component<
  SquarePropsInterface,
  SquareStateInterface,
> {
  // ...
}
```

### コンポーネント間での状態共有

作成した `Square` コンポーネントに対して、実際の ○ × ゲームと同様にユーザの状態を監視して交互に入力を実行させる必要がある。

こうしたコンポーネント間の連携を行いたい場合、ユーザの状態を親コンポーネントに保持しておき、その情報を子コンポーネントに伝達することで実現可能である。

具体的には以下のように子コンポーネントに対して関数を渡しておき、子コンポーネントは渡された関数の実行のみを行うようにしている。

これで `Square` から `Board` のプライベート変数である `squares` 変数に対して関数経由で変更を通知することができるようになっている。

```js
class Board extends React.Component {
  constructor(props) {
    super(props);

    /**
     * 以下のような配列を期待している
     * [
     *   'O', null, 'X',
     *   'X', 'X', 'O',
     *   'O', null, null,
     * ]
     */
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  // ...
}
```

`Square` コンポーネントは以下のように親コンポーネントから渡された自分自身の状態を表示させ、クリックされた場合に親コンポーネントの関数呼び出しを通知するのみの機能を有している。

```js
class Square extends React.Component<
  SquarePropsInterface,
  SquareStateInterface,
> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
```

### 状態共有の TypeScript 化

上記のコードはチュートリアルをそのまま実装しただけで、TypeScript に対応させていないためコンパイルエラーが発生するはずである。

そこで今まで同じように Props や State のインターフェースを新しく定義する必要がある。

`Square` に関しては、状態管理する変数を除去して、親コンポーネントから Props として自身の状態と実行する関数を渡される構造になっているため、以下のようにインターフェースを変更する。

```js
interface SquarePropsInterface {
  value: string;
  onClick: () => void;
}

class Square extends React.Component<SquarePropsInterface> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
```

`Board` では、Props に関してはまだ何も情報がないため `any` 型に設定しておき、状態管理する変数である `squares` のみ以下のように定義しておけばいい。

```js
interface BoardStateInterface {
  squares: string[];
}

class Board extends React.Component<any, BoardStateInterface> {
  constructor(props: any) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i: number) {
    // ...
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

### 関数コンポーネントへの変更

状態管理を行わないコンポーネントでは、クラスコンポーネントよりも関数コンポーネントで定義することで、よりコンポーネントをシンプルに記述することが可能となる。

```js
const Square = (props: SquarePropsInterface) => {
  return (
    // {() => this.props.onClick} --> {props.onClick}
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
```

### 順序性を有する状態管理

○ × ゲームを実現するためには、ボタンをクリックするごとに表示する文字を変更する必要がある。

この変更はゲームの状態を管理している `Board` コンポーネント内で、どちらの手順なのかを判定するロジックを、先行が ×、後攻が ○ になるように真偽値で変更すればいいだけである。

```js
class Board extends React.Component<any, BoardStateInterface> {
  constructor(props: any) {
    super(props);

    // 手番を判定するための真偽値を管理するようにしておく
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    // 手番に応じて表示させる文字列を変更する
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // 手番の更新は真偽値を判定させるだけで十分である
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }
```

もちろん今までと同様にこのままだと TypeScript でコンパイルエラーになってしまう。

そこで以下のように状態管理する変数のインターフェースを変更すればいい。

```js
interface BoardStateInterface {
  squares: string[];
  xIsNext: boolean;
}
```

### 勝敗の決定

勝敗を決定する関数として `calculateWinner` が提供されている。

あとはこの関数を、盤面を描画する際に呼び出して勝敗が決定しているのか判定させることで、勝敗が決まった場合に表示するテキストを変更することができる。

また `Square` コンポーネントの `onClick` が実行された場合に呼び出される関数内で、勝敗が決まっていたりすでに状態を変更済みの場合には早期リターンするようにしておく。

ここは引数の型指定などを行っておけば、TypeScript でコンパイルエラーは発生しない。

```js
const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
```

### State の Game コンポーネントへのリフトアップ

`Game` コンポーネントに対して適用した変更は、1 回 1 回の盤面のデータを状態管理しておくことで、過去のどのタイミングでの盤面の状態を管理できるようにしたことである。

ここでは以下のように 1 つの盤面の情報を有している `squares` 変数を配列として保持するようにしている。

```js
class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }
}
```

またレンダリングを行う際には、以下のように `Board` コンポーネントに対して以下のように現在の盤面の状態と、選択された盤面に関する情報を更新するための関数を渡せばいい。

```js
return (
  // ...
    <div className="game-board">
      <Board
        squares={current.squares}
        onClick={(i) => this.handleClick(i)}
      />
    </div>
  // ...
```

TypeScript の場合には以下のように `Game` コンポーネントが管理している状態をインターフェースで定義する必要がある。

```js
interface GameStateInterface {
  history: { squares: string[] }[];
  xIsNext: boolean;
}

class Game extends React.Component<any, GameStateInterface> {
  // ...
}
```

`Board` では Props で渡されるオブジェクトに関するインターフェースを定義する必要がある。

```js
interface BoardPropsInterface {
  squares: string[];
  onClick: (i: number) => void;
}

class Board extends React.Component<BoardPropsInterface> {
  // ...
}
```

### 過去の着手の表示
