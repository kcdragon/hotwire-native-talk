---
theme: default
title: Introduction to Hotwire Native
info: |
  ## Introduction to Hotwire Native
  Build iOS and Android apps with Ruby on Rails

  Chicago Ruby — March 2026
class: text-center
transition: slide-left
mdc: true
---

# Introduction to Hotwire Native

## Build iOS and Android apps with Ruby on Rails

<br>

Mike Dalton

---
layout: image-right
image: /images/me.jpg
---

# Introduction

- Based in Philadelphia
- Ruby on Rails developer
- Using Hotwire Native on my side project

---
layout: center
---

# I work at

<img src="/images/triumph-logo.jpg" class="max-h-60 mx-auto" />

---
layout: image
image: /images/triumph-site-1.png
backgroundSize: contain
title: Triumph website
---

---
layout: image
image: /images/triumph-site-2.png
backgroundSize: contain
title: Triumph website (cont.)
---

---
layout: statement
---

# triumph.com 🙅

---
layout: statement
---

# triumph.io 👍

---
layout: image
image: /images/triumph-site-3.png
backgroundSize: contain
title: Triumph website (triumph.io)
---

---
layout: section
---

# Hotwire

<img src="/images/hotwire-logo.png" class="max-h-40 mx-auto mt-8" />

<!--
"Before jumping into Hotwire Native, we should discuss Hotwire"
-->

---
layout: image-right
image: /images/hotwire-37signals.png
---

# Hotwire

- Created by 37signals
- Default front end "framework" in Rails 7+
- HTML (not JSON) "over the wire"

---
layout: quote
---

# "Hotwire is an alternative approach to building modern web applications without using much JavaScript by sending HTML instead of JSON over the wire."

[https://hotwired.dev/](https://hotwired.dev/)

<!--
This is a quote from the official Hotwire website
-->

---
layout: center
---

# Hotwire

<div class="flex gap-16 items-center justify-center mt-8">
  <div class="text-center">
    <img src="/images/turbo.svg" class="h-32 mx-auto" />
    <div class="mt-4 text-xl">Turbo</div>
  </div>
  <div class="text-center">
    <img src="/images/stimulus.svg" class="h-32 mx-auto" />
    <div class="mt-4 text-xl">Stimulus</div>
  </div>
  <div class="text-center">
    <img src="/images/native.svg" class="h-32 mx-auto" />
    <div class="mt-4 text-xl">Native</div>
  </div>
</div>

<!--
"Hotwire is made up of 3 parts…"
-->

---

# Hotwire

## Turbo

<br>

- Requires JavaScript but…
- No need to write your own JavaScript!
- Client-side behavior determined by server-side responses

---

# Hotwire

## Turbo Drive

<br>

- Turbolinks successor
- Works "out of the box"
- Performs requests as XHR to prevent page reload

<!--
"Turbo is made up of three parts. Turbo Drive, Turbo Frames and Turbo Streams…"
-->

---
layout: two-cols
---

# Hotwire

## Turbo Frames

<br>

- Only update parts of a page
- Links or form submissions

::right::

<video src="/videos/turbo-frames-demo.mp4" controls muted loop class="max-h-105 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
class: gap-4 text-xs
---

# Hotwire — Turbo Frames

```ruby
class RemindersController < ApplicationController
  def index
    @reminders = Reminder.all
  end

  def edit
    @reminder = Reminder.find(params.expect(:id))
  end

  def update
    reminder = Reminder.find(params.expect(:id))
    reminder.update(reminder_params)
    redirect_to reminders_path, status: :see_other
  end

  private

  def reminder_params
    params.expect(reminder: [ :title ])
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/reminders_controller.rb</div>

::right::

<div class="mt-14" />

```erb
<% @reminders.each do |reminder| %>
  <%= turbo_frame_tag dom_id(reminder) do %>
    <%= link_to edit_reminder_path(reminder) do %>
      <%= reminder.title %>
    <% end %>
  <% end %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/reminders/index.html.erb</div>

<br>

```erb
<%= turbo_frame_tag dom_id(@reminder) do %>
  <%= render "form", reminder: @reminder %>
  <%= form_with(model: @reminder) do |form| %>
    <%= form.text_field :title %>
    <%= form.submit %>
  <% end %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/reminders/edit.html.erb</div>

---
layout: two-cols
---

# Hotwire

## Turbo Streams

<br>

- Modify any part of the page
- More control, more code, more complexity

::right::

<video src="/videos/turbo-streams-demo.mp4" controls muted loop class="max-h-105 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
class: gap-4 text-xs
---

# Hotwire — Turbo Streams

```ruby
class RemindersController < ApplicationController
  def destroy
    reminder = Reminder.find(params.expect(:id))
    reminder.destroy!
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.remove(reminder)
      end
    end
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/reminders_controller.rb</div>

::right::

<div class="mt-14" />

```erb
<% @reminders.each do |reminder| %>
  <%= turbo_frame_tag dom_id(reminder) do %>
    <%= button_to reminder_path(reminder), method: :delete do %>
      <svg ...>
      </svg>
    <% end %>
  <% end %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/reminders/index.html.erb</div>

---
layout: two-cols
---

# Hotwire

## Stimulus

<br>

- Most control
- Custom JavaScript
- jQuery with structure

::right::

<video src="/videos/stimulus-demo.mp4" controls muted loop class="max-h-105 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
class: gap-4 text-xs
---

# Hotwire — Stimulus

```js
export default class extends Controller {
  static targets = ["input", "submitButton"]

  onInput() {
    if (this.inputTarget.value.length > 0) {
      this.submitButtonTarget.disabled = false
    } else {
      this.submitButtonTarget.disabled = true
    }
  }
}
```

<div class="text-xs opacity-60 text-center">app/javascript/controllers/savable_controller.js</div>

::right::

<div class="mt-14" />

```erb
<%= form_with(model: reminder,
              data: { controller: "savable" }) do |form| %>
  <%= form.text_field :title,
        data: { savable_target: "input",
                action: "savable#onInput" } %>
  <%= form.button type: "submit",
        disabled: reminder.new_record?,
        data: { savable_target: "submitButton" } do %>
    <%= reminder.new_record? ? "Add" : "Update" %>
  <% end %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/reminders/_form.html.erb</div>

---
layout: statement
---

# Mobile in 2026 = Many Choices

---

# Native Alternatives

<div class="flex gap-12 items-start justify-center mt-8">
  <div class="text-center">
    <div class="font-bold mb-2">Android (Kotlin)</div>
    <img src="/images/native-android.png" class="max-h-80 rounded shadow-lg" />
  </div>
  <div class="text-center">
    <div class="font-bold mb-2">iOS (Swift)</div>
    <img src="/images/native-ios.png" class="max-h-80 rounded shadow-lg" />
  </div>
</div>

---

# Crossplatform Alternatives

<div class="grid grid-cols-3 gap-x-8 gap-y-2 mt-4 text-center">
  <div>
    <div class="font-bold text-sm">Kotlin Multiplatform</div>
    <img src="/images/xplat-kotlin-multiplatform.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">Kotlin</div>
  </div>
  <div>
    <div class="font-bold text-sm">React Native</div>
    <img src="/images/xplat-react-native.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">React</div>
  </div>
  <div>
    <div class="font-bold text-sm">.NET MAUI</div>
    <img src="/images/xplat-dotnet-maui.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">C#</div>
  </div>
  <div>
    <div class="font-bold text-sm">Flutter</div>
    <img src="/images/xplat-flutter.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">Dart</div>
  </div>
  <div>
    <div class="font-bold text-sm">Ionic</div>
    <img src="/images/xplat-ionic.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">Angular, React or Vue</div>
  </div>
  <div>
    <div class="font-bold text-sm">Swift for Android</div>
    <img src="/images/xplat-swift-android.png" class="max-h-36 mx-auto rounded shadow" />
    <div class="text-xs opacity-60">Swift</div>
  </div>
</div>

---
layout: image-right
image: /images/hotwire-native-history.png
---

# Hotwire Native

## History

<br>

- Created by 37signals
- Turbo Native released in 2020
- Strada released in 2023
- Rebranded Hotwire Native in 2024

---

# Hotwire Native

## Who should use it

<br>

- You have the need for a web app, iOS and Android app
- You want to build with Hotwire and Turbo
- You're comfortable being an early adopter

---

# Hotwire Native

## How does it work

<br>

- Native navigation and animation
- Embedded web browser
- Doesn't look like a browser
- Views look the same as the web

---
layout: section
---

# Project Setup

---

# Project Setup

<br>

- No generator like `rails new`
- Hotwire Native apps are Native apps

---

# Project Setup

## iOS

<br>

- Use the Xcode New Project Wizard
- Add `hotwire-native-ios` package dependency
- Replace `SceneDelegate.swift` with…

---
class: text-sm
---

# Project Setup — iOS

```swift
import HotwireNative
import UIKit

let rootURL = URL(string: "https://hotwire-native-demo.dev")!

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    private let navigator = Navigator(configuration: .init(
        name: "main",
        startLocation: rootURL
    ))

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        window?.rootViewController = navigator.rootViewController
        navigator.start()
    }
}
```

<div class="text-xs opacity-60 text-center">SceneDelegate.swift</div>

---

# Project Setup

## Android

<br>

- Use the Android Studio New Project Wizard
- Add `hotwire-native-android` dependencies to Gradle build files
- Enable internet access in `AndroidManifest.xml`
- Replace `MainActivity.kt` with…
- Replace `activity_main.xml` with…

---
class: text-sm
---

# Project Setup — Android

```kotlin
package com.example.myapplication

import android.os.Bundle
import android.view.View
import androidx.activity.enableEdgeToEdge
import dev.hotwire.navigation.activities.HotwireActivity
import dev.hotwire.navigation.navigator.NavigatorConfiguration
import dev.hotwire.navigation.util.applyDefaultImeWindowInsets

class MainActivity : HotwireActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        findViewById<View>(R.id.main_nav_host).applyDefaultImeWindowInsets()
    }

    override fun navigatorConfigurations() = listOf(
        NavigatorConfiguration(
            name = "main",
            startLocation = "https://hotwire-native-demo.dev",
            navigatorHostId = R.id.main_nav_host
        )
    )
}
```

<div class="text-xs opacity-60 text-center">MainActivity.kt</div>

---

# Project Setup — Android

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/main_nav_host"
    android:name="dev.hotwire.navigation.navigator.NavigatorHost"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:defaultNavHost="false" />
```

<div class="text-xs opacity-60 text-center">activity_main.xml</div>

---

# Project Setup

## Alternative

<div class="flex gap-8 items-center justify-center mt-4">
  <img src="/images/setup-alternative-1.png" class="max-h-80 rounded shadow-lg" />
  <img src="/images/setup-alternative-2.png" class="max-h-80 rounded shadow-lg" />
</div>

---
layout: section
---

# Screen Navigation

---
layout: two-cols
---

# Screen Navigation

## Push and Pop

::right::

<video src="/videos/nav-push-pop.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

<!--
Links will push a new screen onto the stack and use an animation
-->

---
layout: two-cols
---

# Screen Navigation

## Replace

::right::

<video src="/videos/nav-replace.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

<!--
Navigating to the same screen will replace the screen instead of pushing a new screen
-->

---
layout: two-cols
---

# Screen Navigation

## External Links

::right::

<video src="/videos/nav-external-links.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: section
---

# Path Configuration

---

# Path Configuration

<br>

- Should the path use the default view or a modal?
- Should the path use a Rails view or a native view?

---
layout: two-cols
class: gap-4
---

# Path Configuration

## Format

<br>

- JSON
- Stored in native app, or
- Fetched from Rails app

::right::

<div class="text-xs">

```json
{
  "rules": [
    {
      "patterns": [
        ".*"
      ],
      "properties": {
        "context": "default",
        "pull_to_refresh_enabled": true
      }
    },
    {
      "patterns": [
        "/new$",
        "/edit$"
      ],
      "properties": {
        "context": "modal",
        "pull_to_refresh_enabled": false
      }
    }
  ]
}
```

</div>

<!--
https://native.hotwired.dev/reference/navigation
https://native.hotwired.dev/reference/path-configuration
-->

---
layout: two-cols
class: gap-4
---

# Path Configuration

## Basic Navigation

<br>

```json
{
  "rules": [
    {
      "patterns": [
        ".*"
      ],
      "properties": {
        "context": "default",
        "pull_to_refresh_enabled": true
      }
    }
  ]
}
```

::right::

<video src="/videos/pathconfig-basic.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

<!--
https://native.hotwired.dev/reference/navigation
https://native.hotwired.dev/reference/path-configuration
-->

---
layout: two-cols
class: gap-4
---

# Path Configuration

## Modal Navigation

<br>

```json
{
  "rules": [
    {
      "patterns": [
        "/new$",
        "/edit$"
      ],
      "properties": {
        "context": "modal",
        "pull_to_refresh_enabled": false
      }
    }
  ]
}
```

::right::

<video src="/videos/pathconfig-modal.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

<!--
https://native.hotwired.dev/reference/navigation
https://native.hotwired.dev/reference/path-configuration
-->

---
layout: two-cols
class: gap-4
---

# Path Configuration

## Native Screens

<br>

```json
{
  "rules": [
    {
      "patterns": [
        "/numbers$"
      ],
      "properties": {
        "view_controller": "numbers"
      }
    }
  ]
}
```

::right::

<video src="/videos/pathconfig-native-screen.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

<!--
https://native.hotwired.dev/reference/navigation
https://native.hotwired.dev/reference/path-configuration
-->

---
layout: section
---

# Navigation Bar Title

---

# Navigation Bar Title

<div class="flex gap-8 items-center justify-center mt-4">
  <img src="/images/navbar-title-before.png" class="max-h-90 rounded shadow-lg" />
  <img src="/images/navbar-title-after.png" class="max-h-90 rounded shadow-lg" />
</div>

---

# Navigation Bar Title

## Implementation steps

<br>

- Add page-specific title tag in Rails code base
- Hide h1 tag in Rails code base

---
layout: two-cols
---

# Navigation Bar Title

## Add title tag

::right::

<img src="/images/navbar-title-tag.png" class="max-h-110 mx-auto rounded shadow-lg" />

---

# Navigation Bar Title

## Implementation steps

<br>

- Add page-specific title tag in Rails code base
- Hide h1 tag in Rails code base

---
layout: two-cols
class: gap-4 text-sm
---

# Navigation Bar Title

## Add hotwire-native CSS variant

<br>

```erb
<!DOCTYPE html>
<%= tag.html(
  data: {
    hotwire_native: hotwire_native_app?,
  },
) do %>
  <head>
    <title><%= content_for(:title) || "RSS Reader" %></title>
    ...
<% end %>
```

<div class="text-xs opacity-60 text-center">application.html.erb</div>

::right::

<div class="mt-30" />

```css
@variant hotwire-native {
  html[data-hotwire-native="true"] & {
    @slot
  }
}
```

<div class="text-xs opacity-60 text-center">application.css</div>

---
layout: two-cols
---

# Navigation Bar Title

## Hide h1 on Hotwire Native apps

::right::

<img src="/images/navbar-hide-h1.png" class="max-h-110 mx-auto rounded shadow-lg" />

---
layout: section
---

# Native Tab Bar

---
layout: two-cols
---

# Native Tab Bar

<br>

- Built in to Hotwire Native
- Each tab is a…
  - separate web view
  - separate navigation stack

::right::

<video src="/videos/tabbar-ios.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---

# Native Tab Bar

## Implementation steps

<br>

- Add native tab bar to iOS code base
- Add native tab bar to Android code base
- Hide web-based navigation in Rails code base

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## iOS

::right::

```swift
let baseUrl = URL(string: "http://localhost:3000")!

extension HotwireTab {
    static let all: [HotwireTab] = {
        var tabs: [HotwireTab] = [
            .feeds,
            ...
        ]

        return tabs
    }()

    static let feeds = HotwireTab(
        title: "Feeds",
        image: .init(systemName: "tray")!,
        url: baseUrl.appending(path: "/feeds")
    )

    ...
}
```

<div class="text-xs opacity-60 text-center">Tabs.swift</div>

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## iOS

<br>

- Title
- Image
- URL

::right::

```swift
class SceneController: UIResponder {
    ...

    private lazy var tabBarController =
        HotwireTabBarController(navigatorDelegate: self)
}

extension SceneController: UIWindowSceneDelegate {
    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
        ...

        tabBarController.load(HotwireTab.all)
    }
}
```

<div class="text-xs opacity-60 text-center">SceneController.swift</div>

---

# Native Tab Bar

## Implementation steps

<br>

- Add native tab bar to iOS code base
- Add native tab bar to Android code base
- Hide web-based navigation in Rails code base

---
layout: two-cols
---

# Native Tab Bar

## Android

::right::

<video src="/videos/tabbar-android.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## Android

::right::

```kotlin
private val feeds = HotwireBottomTab(
    title = "Feeds",
    iconResId = R.drawable.inbox_24px,
    configuration = NavigatorConfiguration(
        name = "feeds",
        navigatorHostId = R.id.feeds_nav_host,
        startLocation = "$baseUrl/feeds"
    )
)

...

val mainTabs = listOf(
    feeds,
    ...
)
```

<div class="text-xs opacity-60 text-center">Tabs.kt</div>

---
class: text-xs
---

# Native Tab Bar — Android

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    ...>

    <androidx.fragment.app.FragmentContainerView
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/feeds_nav_host"
        android:name="dev.hotwire.navigation.navigator.NavigatorHost"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:defaultNavHost="false"
        app:layout_constraintBottom_toTopOf="@id/bottom_nav"
        app:layout_constraintTop_toTopOf="parent" />

    ...

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottom_nav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:labelVisibilityMode="labeled"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

<div class="text-xs opacity-60 text-center">activity_main.xml</div>

---
class: text-sm
---

# Native Tab Bar — Android

```kotlin
class MainActivity : HotwireActivity() {
    private lateinit var bottomNavigationController: HotwireBottomNavigationController

    override fun onCreate(savedInstanceState: Bundle?) {
        ...

        initializeBottomTabs()
    }

    private fun initializeBottomTabs() {
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottom_nav)
        bottomNavigationController = HotwireBottomNavigationController(this, bottomNavigationView)
        bottomNavigationController.load(mainTabs, 0)
    }
}
```

<div class="text-xs opacity-60 text-center">MainActivity.kt</div>

---

# Native Tab Bar

## Implementation steps

<br>

- Add native tab bar to iOS code base
- Add native tab bar to Android code base
- Hide web-based navigation in Rails code base

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## Hide Web Navigation

<br>

```erb
<body>
  ...

  <main>
    <% if authenticated? %>
      <header class="hotwire-native:hidden flex ...">
        <button ...>
        </button>
      </header>
    <% end %>

    <%= yield %>
  </main>

  ...
</body>
```

::right::

<div class="flex gap-4 items-center justify-center h-full">
  <img src="/images/tabbar-web-nav-1.png" class="max-h-100 rounded shadow-lg" />
  <img src="/images/tabbar-web-nav-2.png" class="max-h-100 rounded shadow-lg" />
</div>

---
layout: two-cols
---

# Calendar Switcher

## Web

::right::

<video src="/videos/calendar-switcher-web.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
---

# Calendar Switcher

## iOS App (HTML Dialog)

::right::

<video src="/videos/calendar-switcher-html-dialog.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
---

# Calendar Switcher

## iOS App (Native Modal)

::right::

<video src="/videos/calendar-switcher-native-modal.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
class: gap-4 text-xs
---

# Web Implementation

<div class="mt-8" />

```erb
<%= link_to calendars_path,
    data: {
      turbo_stream: true
    } do %>
  <%= render "heroicons/arrows_up_down" %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/calendars/show.html.erb</div>

::right::

<div class="mt-14" />

```ruby
class CalendarsController < ApplicationController
  def index
    @calendars = current_user.calendars
    respond_to do |format|
      format.turbo_stream
    end
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/calendars_controller.rb</div>

<br>

```erb
<%= turbo_stream.replace "dialog-container" do %>
  <div id="dialog-container">
    <dialog class="modal" open>
      <%= render "index", calendars: @calendars %>
    </dialog>
  </div>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/calendars/index.turbo_stream.erb</div>

---
layout: two-cols
class: gap-4 text-xs
---

# Native Implementation

```erb
<%= link_to calendars_path,
    data: {
      turbo_stream: !hotwire_native_app?
    } do %>
  <%= render "heroicons/arrows_up_down" %>
<% end %>
```

<div class="text-xs opacity-60 text-center">app/views/calendars/show.html.erb</div>

```ruby
class ConfigurationsController < ApplicationController
  def ios_v1
    render json: {
      rules: [
        {
          patterns: [
            "#{calendars_path}$"
          ],
          properties: {
            context: "modal",
            presentation: "default",
            pull_to_refresh_enabled: false
          }
        }
      ]
    }
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/configurations_controller.rb</div>

::right::

<div class="mt-14" />

```ruby
class CalendarsController < ApplicationController
  def index
    @calendars = current_user.calendars
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/calendars_controller.rb</div>

<br>

```erb
<%= render "index", calendars: @calendars %>
```

<div class="text-xs opacity-60 text-center">app/views/calendars/index.html.erb</div>

---
layout: section
---

# Bridge Components

---

# Bridge Components

<br>

- Formerly called Strada
- Three parts
  - Stimulus controller
  - iOS component
  - Android fragment

---

# Bridge Components

## Navigation Bar Button

<div class="flex gap-8 items-center justify-center mt-4">
  <img src="/images/bridge-button-1.png" class="max-h-90 rounded shadow-lg" />
  <img src="/images/bridge-button-2.png" class="max-h-90 rounded shadow-lg" />
</div>

---

# Bridge Components

## Navigation Bar Button

<br>

- Add Stimulus controller
- Update the `link_to` helper to use the Stimulus controller
- Add iOS component
- Add Android component

---
class: text-sm
---

# Bridge Components — Navigation Bar Button

```js
import { BridgeComponent } from "@hotwired/hotwire-native-bridge"

export default class extends BridgeComponent {
  static component = "button"

  connect() {
    super.connect()

    const element = this.bridgeElement
    const title = element.bridgeAttribute("title")
    this.send("connect", {title}, () => {
      this.element.click()
    })
  }
}
```

<div class="text-xs opacity-60 text-center">app/javascript/controllers/bridge/button_controller.js</div>

---

# Bridge Components — Navigation Bar Button

```erb
<%= link_to "Add Feed", new_feed_path,
  class: "hotwire-native:hidden btn-primary",
  data: {
    controller: "bridge--button",
    bridge_title: "Add Feed",
  } %>
```

<div class="text-xs opacity-60 text-center">app/views/feeds/index.html.erb</div>

---
class: text-xs
---

# Bridge Components — Navigation Bar Button

```swift
import HotwireNative
import UIKit

final class ButtonComponent: BridgeComponent {
    override class var name: String { "button" }

    override func onReceive(message: Message) {
        guard let viewController else { return }
        addButton(via: message, to: viewController)
    }

    private var viewController: UIViewController? {
        delegate?.destination as? UIViewController
    }

    private func addButton(via message: Message, to viewController: UIViewController) {
        guard let data: MessageData = message.data() else { return }

        let action = UIAction { [unowned self] _ in
            self.reply(to: "connect")
        }
        let item = UIBarButtonItem(title: data.title, primaryAction: action)
        viewController.navigationItem.rightBarButtonItem = item
    }
}

private extension ButtonComponent {
    struct MessageData: Decodable {
        let title: String
    }
}
```

<div class="text-xs opacity-60 text-center">ButtonComponent.swift</div>

---
class: text-sm
---

# Bridge Components — Navigation Bar Button

```swift
import HotwireNative
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication,
      didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Hotwire.registerBridgeComponents([
            ButtonComponent.self
        ])
        return true
    }
}
```

<div class="text-xs opacity-60 text-center">AppDelegate.swift</div>

---
class: text-xs
---

# Bridge Components — Navigation Bar Button

```kotlin
class ButtonComponent(
    name: String,
    private val delegate: BridgeDelegate<HotwireDestination>
) : BridgeComponent<HotwireDestination>(name, delegate) {

    override fun onReceive(message: Message) {
        // Handle incoming messages based on the message `event`.
        when (message.event) {
            "connect" -> handleConnectEvent(message)
            else -> Log.w("ButtonComponent", "Unknown event for message: $message")
        }
    }

    private fun handleConnectEvent(message: Message) {
        val data = message.data<MessageData>() ?: return

        // Write native code to display a native submit button in the
        // toolbar displayed in the delegate.destination. Use the
        // incoming data.title to set the button title.
    }

    private fun performButtonClick(): Boolean {
        return replyTo("connect")
    }

    // Use kotlinx.serialization annotations to define a serializable
    // data class that represents the incoming message.data json.
    @Serializable
    data class MessageData(
        @SerialName("title") val title: String
    )
}
```

<div class="text-xs opacity-60 text-center">ButtonComponent.kt</div>

---

# Bridge Components — Navigation Bar Button

```kotlin
Hotwire.registerBridgeComponents(
    BridgeComponentFactory("button", ::ButtonComponent)
)
```

---
layout: two-cols
---

# Bridge Components

## Navigation Bar Button

::right::

<video src="/videos/bridge-button-demo.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
layout: two-cols
---

# Bridge Components

## Navigation Bar Menu

<img src="/images/bridge-menu.png" class="max-h-80 mt-4 rounded shadow-lg" />

::right::

<video src="/videos/bridge-menu-demo.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---

# Bridge Components

## Toast Messages

<div class="flex gap-8 items-center justify-center mt-4">
  <img src="/images/toast-1.png" class="max-h-85 rounded shadow-lg" />
  <img src="/images/toast-2.png" class="max-h-85 rounded shadow-lg" />
</div>

---
layout: two-cols
---

# Bridge Components

## Request Permissions

::right::

<img src="/images/request-permissions.png" class="max-h-110 mx-auto rounded shadow-lg" />

---
layout: two-cols
---

# Bridge Components

## Joe Masilotti's library

::right::

<img src="/images/masilotti-library.png" class="max-h-110 mx-auto rounded shadow-lg" />

---
layout: section
---

# Native Components

---
layout: two-cols
---

# Add to Calendar

## iOS

::right::

<video src="/videos/add-to-calendar-ios.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---
class: text-xs
---

# Handle URL with a native component

```swift
class SceneController: UIResponder {
    private var addToCalendarController: AddToCalendarController?
}

extension SceneController: NavigatorDelegate {
    func handle(proposal: VisitProposal, from navigator: Navigator) -> ProposalResult {
        switch proposal.viewController {
        case "add_to_calendar":
            let idRegex = /(?<id>\d+)\/add_to_calendar/
            let url = proposal.url.absoluteString
            if let match = url.firstMatch(of: idRegex) {
                let calendarEventId = Int(match.id)!
                Task { await addToCalendarController?.addToCalendar(calendarEventId: calendarEventId) }
            }
            return .reject
        default:
            return .accept
        }
    }
}
```

<div class="text-xs opacity-60 text-center">SceneController.swift</div>

---
layout: two-cols
class: gap-4 text-xs
---

# Show Event View

<br>

- Get event data from Rails app
- Launch native event view

::right::

```swift
class AddToCalendarController: NSObject {
    private weak var window: UIWindow?

    init(window: UIWindow?) {
        self.window = window
        super.init()
    }

    func addToCalendar(calendarEventId: Int) async {
        let url = baseUrl.appendingPathComponent("calendar_events/\(calendarEventId)")
        let viewModel = CalendarEventViewModel(url: url)

        await viewModel.fetchCalendarEvent()

        guard let calendarEvent = viewModel.calendarEvent else {
            print("Error: Could not fetch calendar event")
            return
        }

        let event = EKEvent(eventStore: CalendarEventStore.shared)
        event.calendar = CalendarEventStore.shared.defaultCalendarForNewEvents
        event.title = calendarEvent.name
        event.location = calendarEvent.location
        event.startDate = calendarEvent.startsAt
        event.endDate = calendarEvent.endsAt

        await MainActor.run {
            let eventViewController = AddToCalendarEKEventEditViewController()
            eventViewController.calendarEventId = calendarEventId
            eventViewController.event = event
            eventViewController.eventStore = CalendarEventStore.shared
            eventViewController.editViewDelegate = self

            window?.rootViewController?.present(eventViewController, animated: true)
        }
    }
}
```

<div class="text-xs opacity-60 text-center">AddToCalendarController.swift</div>

---
layout: two-cols
class: gap-4 text-xs
---

# Dismiss Event View

<br>

- Event gets added to their calendar
- Dismiss event view
- Show success toast message

::right::

```swift
extension AddToCalendarController: EKEventEditViewDelegate {
    func eventEditViewController(
        _ controller: EKEventEditViewController,
        didCompleteWith action: EKEventEditViewAction
    ) {
        controller.dismiss(animated: true)

        switch action {
        case .saved:
            if let rootViewController = window?.rootViewController {
                ToastController(rootViewController).showToast("Event added!")
            }
            print("User saved the event to their calendar")
        default:
            print("User did not save the event to their calendar")
        }
    }
}
```

<div class="text-xs opacity-60 text-center">AddToCalendarController.swift</div>

---
class: text-sm
---

# Configure URL to use native component

```ruby
class ConfigurationsController < ApplicationController
  def ios_v1
    render json: {
      rules: [
        {
          patterns: [
            "/calendar_events/[0-9]+/add_to_calendar"
          ],
          properties: {
            view_controller: "add_to_calendar"
          }
        }
      ]
    }
  end
end
```

<div class="text-xs opacity-60 text-center">app/controllers/configurations_controller.rb</div>

---

# Add link to open native component

```erb
<%= link_to "/calendar_events/#{calendar_event.id}/add_to_calendar" do %>
  Add to Calendar
<% end %>
```

<div class="text-xs opacity-60 text-center">_add_to_calendar.html.erb</div>

---
layout: two-cols
---

# Add to Calendar

## Android

::right::

<video src="/videos/add-to-calendar-android.mp4" controls muted loop class="max-h-110 mx-auto rounded-lg shadow-lg" />

---

# Route Decision Handler

## Overview

<br>

- Change what happens when a URL is received
- By default
  - Internal URLs → App
  - HTTP External URLs → System Browser
  - Non-HTTP External URLs → Device Navigation

---
class: text-sm
---

# Route Decision Handler — Interface

```kotlin
class AddToCalendarRouteDecisionHandler : Router.RouteDecisionHandler {
    override val name = "add-to-calendar-app-navigation"

    override fun matches(
        location: String,
        configuration: NavigatorConfiguration
    ): Boolean {
        ...
    }

    override fun handle(
        location: String,
        configuration: NavigatorConfiguration,
        activity: HotwireActivity
    ): Router.Decision {
        ...
    }
}
```

---
class: text-sm
---

# Route Decision Handler — matches function

```kotlin
override fun matches(
    location: String,
    configuration: NavigatorConfiguration
): Boolean {
    val doesMatch = configuration.startLocation.toUri().host == location.toUri().host
            && Regex(".*/calendar_events/\\d+/add_to_calendar$").matches(location)
    return doesMatch
}
```

---
class: text-xs
---

# Route Decision Handler — handle function

```kotlin
override fun handle(
    location: String,
    configuration: NavigatorConfiguration,
    activity: HotwireActivity
): Router.Decision {
    val viewModel = buildCalendarEventViewModel(location)
    viewModel.fetchCalendarEvent()
    viewModel.calendarEventState.observe(activity) { calendarEvent ->
        openCalendarEventInIntent(calendarEvent, activity)
    }
    return Router.Decision.CANCEL
}

private fun buildCalendarEventViewModel(location: String): CalendarEventViewModel {
    val path = location.replace(Regex("/add_to_calendar$"), "")
    return CalendarEventViewModel(url = "${path}.json")
}

private fun openCalendarEventInIntent(
    calendarEvent: CalendarEvent,
    activity: HotwireActivity
) {
    var startsAtInMillisecondsSinceEpoch = calendarEvent.startsAtInMillisecondsSinceEpoch
    var endsAtInMillisecondsSinceEpoch = calendarEvent.endsAtInMillisecondsSinceEpoch
    var intent = Intent(Intent.ACTION_INSERT)
        .setData(CalendarContract.Events.CONTENT_URI)
        .putExtra(CalendarContract.Events.TITLE, calendarEvent.name)
        .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startsAtInMillisecondsSinceEpoch)
        .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endsAtInMillisecondsSinceEpoch)
        .putExtra(CalendarContract.Events.ALL_DAY, calendarEvent.allDay)
    activity.startActivity(intent)
}
```

---
class: text-sm
---

# Route Decision Handler — Registration

```kotlin
class CalendarVisionApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Hotwire.registerRouteDecisionHandlers(
            AddToCalendarRouteDecisionHandler(),
            AppNavigationRouteDecisionHandler(),
            BrowserTabRouteDecisionHandler(),
            SystemNavigationRouteDecisionHandler(),
        )
    }
}
```

---

# Add to Calendar native component

<br>

- Different implementations on iOS and Android
- Same Rails code for triggering the native component

---
layout: section
---

# Review

---
layout: statement
---

# Native navigation and animation

---
layout: statement
---

# Path configuration to change navigation behavior

---
layout: statement
---

# The Native Tab Bar is an easy native component to add

---
layout: statement
---

# Bridge components when you need a little bit of native functionality

---
layout: statement
---

# Native components when bridge components aren't enough

---
layout: two-cols
---

# Resources

<br>

- Hotwire Native Handbook by 37signals
- *Hotwire Native for Rails Developers* book by Joe Masilotti
- Learn Hotwire course by Chris Oliver and William Kennedy

::right::

<div class="flex flex-col gap-4 items-center justify-center h-full">
  <img src="/images/jmnative-book.jpg" class="max-h-60 rounded shadow-lg" />
  <img src="/images/learnhotwire.svg" class="max-h-30" />
</div>

---
layout: image
image: /images/outro-1.png
backgroundSize: contain
title: Outro
---

---
layout: image
image: /images/outro-2.png
backgroundSize: contain
title: Outro (cont.)
---

---
layout: center
class: text-center
---

# Thanks!

<div class="flex gap-12 items-center justify-center mt-8">
  <img src="/images/calendar-vision-app.png" class="max-h-60 rounded shadow-lg" />
  <img src="/images/qr-code.png" class="max-h-60 rounded shadow-lg" />
</div>

<br>

[https://calendarvision.app/](https://calendarvision.app/)
