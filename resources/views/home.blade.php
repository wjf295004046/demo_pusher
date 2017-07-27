@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-2">
            <div class="panel panel-default">
                <div class="panel-heading">在线人数 : @{{ online }}</div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li v-for="member in members" class="list-group-item">
                            <a href="javascript:void(0)">@{{ member.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">聊天窗口</div>

                <div class="panel-body">
                    <div class="chat-content container" id="chat-content">
                        <div class="chat-item row" v-for="msg in hismessage">
                            <chat_content_me v-if="msg.isme" v-bind:msg="msg.message"></chat_content_me>
                            <chat_content_other v-if="!msg.isme" v-bind:msg="msg.message" v-bind:user="msg.name"></chat_content_other>
                        </div>
                    </div>
                    <div class="row" id="message-control">
                        <div class="col-md-12">
                            <textarea name="message" id="message" cols="30" rows="10" v-model="message"></textarea>
                            <input type="button" id="send-message" v-on:click="sendMessage" value="发送" class="btn btn-large">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
