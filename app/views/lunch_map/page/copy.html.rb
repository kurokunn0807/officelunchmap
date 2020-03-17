<!DOCTYPE HTML>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ランチマップ</title>
</head>
<body>
<header>
  <div id="headerTop">
    <h1 id="logo">ランチマップ</h1>
  </div>
  <div>
    <ul type="none">
      <li></li>
    </ul>
  </div>
</header>

<% if flash[:notice] %>
<div id ="postMessage">
  <%= flash[:notice] %>
</div>
<% end %>
<div id="modal">
  <div class="image_modal">
    
  </div>
</div>

<div id="container">
  <div id="main">
    <div id="artsMap" style="clear: both;"></div>       
    <div id="comment">
      <div class="valiA">
        <div id="view">
          <% @posts.each do|post| %>
          <div class="post">
            <div class="content">
              <%= post.content %>              
            </div>
            <% if post.image_name %>
              <div>
                <img id="image" src="<%= "/lunch_map/post/#{post.image_name}" %>">
              </div>
            <% end %>
            <div class="created">
              <%= post.created_at.strftime('%Y年%m月%d日 %H:%M') %>
            </div>
          </div>
          <% end %>
        </div>
      </div>
      <div class="valiB">
        <div id="form">
          <%= form_tag("posts/create",{multipart: true})do %>
            <div class="form_top">        
              <textarea name="content" placeholder="140文字以内"></textarea>
            </div>
            <div  class="form_bottom clearfix">
              <div class="file">
                <input type="file" name="image">
              </div>
              <div class="submit">
                <input type="submit">
              </div>
            </div>
          <% end %>
        </div>
      </div>
    </div>
  </div>
    <div class="address">
      <%= form_tag("posts/mark",{method: "post"})do %>
      <div id="icon_container">
        <div class="icon_form">
          <span>住所</span>
          <input  name="address">
          <span>店名</span>
          <input name="name">
        </div>
      </div>
      <input type="submit" value="登録">
      <% end %>
    </div>
</div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGYj-ztTeAXtk4e_79R6UOlAU5uKN4vhs&sensor=true&libraries=places&callback=initMap"></script>

</body>
</html>