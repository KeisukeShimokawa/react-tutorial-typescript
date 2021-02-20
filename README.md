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
  squares: Array<string>;
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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
