# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name  |string|null: false|

# 以下はdeviseを使用

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user  |refarence|foreign_key: true|
|group |refarence|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text  |text|		|
|image |string|		|
|user  |refarence|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


