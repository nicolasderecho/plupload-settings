#Plupload Settings

Use Plupload with ease!
 
###Installation

This is a very simple script created to be used in rails apps, but it could work in other frameworks too. It's only needs a previous element with some information:


```html
<head>
    <span class="js-plupload-initializer"  data-authenticityname = "<%= request_forgery_protection_token.to_s %>" data-authenticitytoken = "<%= form_authenticity_token %>" data-flashurl = "<%= asset_path('Moxie.swf') %>" data-silverlightxapurl = "<%= asset_path('Moxie.xap') %>" ></span>
    <script type="text/javascript" src="plupload.full.min.js"></script>    
    <script type="text/javascript" src="plupload_settings.js"></script> <!-- Must be included after the plupload script-->    
</head>
```

And the script will set up the default values for plupload requests. No need to specify authencity token in every request!!!!

###Example in Rails


\#layouts/application.html.erb
```HTML
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MyTitle</title>
        <%= favicon_link_tag 'favicon.ico' %>
        <%= render partial: "layouts/plupload" %>
        <%= stylesheet_link_tag    'application', media: 'all' %>
        <%= javascript_include_tag 'application'%>
        <%= csrf_meta_tags %>
        <!-- Specific head -->
        <%= yield(:head) %> 
    </head>
    <body>
        <%= render partial: "layouts/flash_notifications" %>
        <%= render partial: "layouts/header" %>
        <div class = "container">
            <%= yield %>    
        </div>
        <!-- Specific Scripts -->
        <%= yield(:scripts) %>      
    </body>
</html>
```


\#layouts/_plupload.html.erb
```html
<span class="js-plupload-initializer"  data-authenticityname = "<%= request_forgery_protection_token.to_s %>" data-authenticitytoken = "<%= form_authenticity_token %>" data-flashurl = "<%= asset_path('Moxie.swf') %>" data-silverlightxapurl = "<%= asset_path('Moxie.xap') %>" ></span>
```

###Awesome but I need to use this in Active Admin.... I hate my life 

Don't Worry! you can use a simple monkey patch to use this:

\#config/initializers/monkey_patchs/active_admin.rb
```ruby
module ActiveAdmin
  module Views
    module Pages
      class Base < Arbre::HTML::Document

        def build_active_admin_head
          within @head do
            insert_tag Arbre::HTML::Title, [title, render_or_call_method_or_proc_on(self, active_admin_namespace.site_title)].compact.join(" | ")
            active_admin_application.stylesheets.each do |style, options|
              text_node stylesheet_link_tag(style, options).html_safe
            end

            render(partial: "/layouts/plupload") #This will make you happy!

            active_admin_application.javascripts.each do |path|
              text_node(javascript_include_tag(path))
            end

            if active_admin_namespace.favicon
              text_node(favicon_link_tag(active_admin_namespace.favicon))
            end

            text_node csrf_meta_tag
          end
        end
      end
    end
  end
end
```

And after that, restart the server and include the plupload_settings normally

\#assets/javascripts/active_admin.js
```javascript
//= require active_admin/base
//= require plupload.full.min
//= require initializers/plupload
```

Tell all your friends!