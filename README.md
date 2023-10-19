# Tamemol Plus

## サービス URL

https://github.com/OHTA1127 (デプロイ後更新)

## 概要

「Tamemol Plus」はあなたのの毎日のちょっとした無駄遣いをなくすことを目的とした家計簿アプリケーションです！<br>
お菓子や買い物などで何かを我慢した時にメモ感覚で我慢したものを記録していくことで自分の頑張りを可視化させます。<br>
また買ってしまった物も記録していくことで何に自分がよく無駄遣いしてしまうかを分析することも可能となっています。

## アプリケーションを作ったキッカケ

「毎日のちょっとした無駄遣いを減らしたい！」と考えたのが最初のキッカケでした。<br>
「なんで無駄遣いをしてしまうのか」ということを考えた時に、小さい金額のものであればあるほど無意識的につい買ってしまうのではないかと考えました。<br>
そこで我慢したものをしっかりと記録に残すことで自分の頑張りを可視化し、より我慢することに対してのモチベーションを高めることで我慢につながるのではないかと思い、このアプリケーションを作りました！
また「Tamemol Plus」では自分が何によく無駄遣いをしてしまうのかということも分析することが可能なため、自分のことを理解しつつ無駄遣いを減らせます！

## 使用技術
#### フロントエンド言語
<img src="https://img.shields.io/badge/-Typescript-000000.svg?logo=typescript&style=for-the-badge">

#### フロントエンドフレームワーク
<img src="https://img.shields.io/badge/-React-000000.svg?logo=react&style=for-the-badge"><img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">

#### バックエンド
<img src="https://img.shields.io/badge/-Supabase-000000.svg?logo=supabase&style=for-the-badge">

#### CSSフレームワーク
<img src="https://img.shields.io/badge/-Chakraui-000000.svg?logo=chakra-ui&style=for-the-badge">

#### その他
<img src="https://img.shields.io/badge/-chart.js-000000.svg?logo=chart.js&style=for-the-badge">

## 機能一覧

| topページ | authページ |
| :---: | :---: |
| ![Topページ](top.jpg) | ![Authページ](auth.jpg) |
| アプリケーションのトップページです。 | メールアドレスとパスワードによる認証が行うことが可能。<br>サインアップとログインを切り替えることができ、まだアカウントを持っていない場合は新しいアカウントを作成してもらいます。 |

| recordページ | summaryページ |
| :---: | :---: |
| ![Recordページ](record.jpg) | ![Summaryページ](summary.jpg) |
| CRUD機能で我慢した商品の追加や削除、編集を行うページ。<br>このページではデフォルトで今月のデータが表示されます。<br>目標金額のカードをクリックすることで編集ページに遷移することができます。| 月ごとのデータを切り替えて表示するページ。<br>過去の我慢や購買情報を遡って確認できます。 |

| editページ | statsページ |
| :---: | :---: |
| ![Editページ](edit.jpg) | ![Statsページ](stats.jpg) |
| ユーザー名と月にどれくらい我慢したいかを設定できます。 | 過去のすべてのデータをもとに今までの結果が表示されます。<br>グラフを用いることで一目で自分の我慢や何に多くお金を<br>使っているのかを確認することができます。|

## 苦労・工夫した点
### UI/UX
「Tamemol Plus」では特にUI.UXのに注力して作りました！自分は過去に「Tamemol Puls」の前身となる「Tamemol」というアプリケーションを作ったのですが、使用技術がHTML・CSS・Rubyのみであったため、実装したかったUIやUXを全て実装することができませんでした。<br>
しかし今年の夏に行かせていただいた中期のインターン先でフロントエンドの技術であるType ScriptやReact、Next.jsを学ぶことができ、「自分が本当に作りたかったものを作りたい！」という思いからもう一度作ることに決めました。<br>
どうすればユーザーが自分のことを直感的に理解でき、日々の我慢に繋げることができるかということを特に意識し、開発を進めました！

### Supabaseとの連携
Supabaseとの連携が特に苦労した点です。Next.jsでSupabaseを使用する場合、サーバーコンポーネントでデータの取得、クライアントコンポーネントでデータの作成・編集・削除を行う必要がありました。
そこで取得したデータをクライアントコンポーネントで使用しようとした場合、サーバーコンポーネントからpropsとして渡す必要があるなどディレクトリ構成を工夫必要がありました。




