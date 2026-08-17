---
theme: default
colorSchema: light
title: Hotwire Native
info: |
  ## Hotwire Native
  Build iOS and Android apps with Ruby on Rails

  Ruby Conf Africa — August 2026
class: text-center
transition: slide-left
mdc: true
routerMode: hash
addons:
  - fancy-arrow
---

# Introduction to Hotwire Native

## Build iOS and Android apps with Ruby on Rails

Mike Dalton

---
layout: inline-image
text: Hi, I'm Mike
image: /images/mike-dalton.jpg
position: before
imageClass: h-64 w-64 rounded-full object-cover
---

<img v-drag="[316,284,120,75]" src="/images/mustache.png" alt="Mustache" />

<!--
Hi! I'm Mike. You may know me as this floating head from social media. I've had a couple people mention it doesn't quite look like me anymore so I've updated it to include a mustache.
-->

---
class: text-center
---

# I'm from Philadelphia

<img v-drag="[180,110,620,383]" src="/images/us-map.svg" alt="Map of the United States" />

<div v-drag="[711,247,12,12]" data-id="philly-dot" class="rounded-full bg-red-600 ring-2 ring-red-300"></div>

<div v-drag="[740,135,170,40]" data-id="philly-label" class="text-2xl font-bold text-red-600 whitespace-nowrap">Philadelphia</div>

<div class="absolute inset-0 pointer-events-none" style="z-index: 200">
  <FancyArrow from="(786,164)" to="(720,250)" color="#dc2626" width="2.5" head-size="18" roughness="1.2" arc="0.2" seed="7" />
</div>

<!--
I live in Philadelphia on the eastern coast of the United States which is in between New York City and Washington DC.
-->

---
layout: image
image: /images/iasip-new.png
backgroundSize: cover
title: It's Always Sunny
---

<!--
You may know about Philadelphia from this group of friends. This is the cast of "It's Always Sunny in Philadelphia".
-->

---
layout: image
image: /images/rocky-italian-market.jpg
backgroundSize: cover
title: Rocky running through the Italian Market
---

<!--
Or you may know Philadelphia from the movie "Rocky". This scene was filmed about a 10 minute walk from my house. The neighborhood still looks pretty much the same even though this is from 50 years ago.
-->

---
layout: image
image: /images/cheesesteak.jpg
backgroundSize: cover
title: Philly cheesesteak
---

<!--
Or you may know Philadelphia from its most popular food, the Philly Cheese Steak.
-->

---
layout: inline-image
text: I work at
image: /images/triumph-logo.svg
position: after
imageClass: w-90
---

<!--
I work at a US-based company called Triumph.
-->

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
layout: inline-image
text: Building Calendar Vision
image: /images/calendar-vision-logo.png
position: before
imageClass: w-60 rounded-2xl
---

<!--
And in my free time, I like working on side projects like Calendar Vision.
-->

---
title: Calendar Vision screenshots
---

<img v-drag="[86,46,213,460]" src="/images/cv-capture.webp" class="h-full w-full object-contain" alt="Capturing a flyer with the camera" />

<img v-drag="[384,46,213,460]" src="/images/cv-extracted.webp" class="h-full w-full object-contain" alt="Extracted event details" />

<img v-drag="[682,46,213,460]" src="/images/cv-adding.webp" class="h-full w-full object-contain" alt="Adding the event to a calendar" />

<!--
Calendar Vision is a Hotwire Native app that allows people to take a picture of an image and easily extract events from that photo to add to your favorite calendar app.
-->

---
layout: image-right
image: /images/hotwire-37signals.png
---

# Hotwire

- Created by 37signals
- Default front end "framework" in Rails 7+
- HTML (not JSON) "over the wire"

<!--
Before we get into Hotwire Native, I want to talk a little bit about Hotwire itself.

Hotwire is the default front end framework in Rails since Rails 7. It was created by 37signals.

Hotwire stands for "HTML over the wire"
-->

---
layout: quote
---

# "Hotwire is an alternative approach to building modern web applications without using much JavaScript by sending HTML instead of JSON over the wire."

[https://hotwired.dev/](https://hotwired.dev/)

<!--
This is a quote from the Hotwire website and I think it does a good job of summarizing the framework.
-->

---
layout: center
title: Hotwire libraries
---

<img v-drag="[83,254,204,45]" src="/images/turbo.svg" />

<img v-drag="[351,254,278,45]" src="/images/stimulus.svg" />

<img v-drag="[685,254,218,45]" src="/images/native.svg" />

<!--
Hotwire is made up of 3 parts: Turbo, Stimulus and Hotwire Native
-->

---
layout: center
title: The three parts of Turbo
---

<h1 class="text-center">Turbo</h1>

<div class="mt-12 flex items-start justify-center gap-14">

<div v-for="part in [
  { name: 'Turbo Drive', blurb: 'Swaps the whole page', cells: [1,1,1,1] },
  { name: 'Turbo Frames', blurb: 'Swaps one region', cells: [0,1,0,0] },
  { name: 'Turbo Streams', blurb: 'Swaps many regions', cells: [1,0,1,0] },
]" :key="part.name" class="flex flex-col items-center gap-3">

  <div class="w-44 rounded-lg border-2 border-gray-300 dark:border-gray-600 p-2 flex flex-col gap-2">
    <div
      v-for="(on, i) in part.cells" :key="i"
      class="h-8 rounded transition-colors"
      :class="on ? 'bg-[#5CD8E5]' : 'bg-gray-200 dark:bg-gray-700'"
    />
  </div>

  <div class="text-lg font-semibold">{{ part.name }}</div>
  <div class="text-sm opacity-60 -mt-2">{{ part.blurb }}</div>

</div>

</div>

<!--
Turbo is made up of three parts. Turbo Drive, Turbo Frames and Turbo Streams. A good way to think about them is that Turbo Drive modifies the entire page. Turbo Frames modifies a single part of the page and Turbo Streams modified many different parts of the page. 
-->

---
layout: two-cols
class: text-xs
---

# Turbo Drive

<br>

<CodeCaption caption="app/javascript/application.js">

```js
import "@hotwired/turbo-rails"
```

</CodeCaption>

<br>

<CodeCaption caption="app/views/feeds/_card.html.erb">

```erb
<%= link_to "View", feed_path(feed) %>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/turbo-drive-demo.mp4" maxH="max-h-105" />

<!--
You get Turbo Drive for free just by using the framework.

There's nothing additional you need to do. Turbo Drive works behind the scene's by intercepting link clicks and form submissions and instead of refreshing the page it will perform the requests in the background and swap in the response it receives from the server.

Turbo Drive will also pre-fetch links that are hovered over so the page loads faster for the user clicking on the link.
-->

---
layout: two-cols
class: text-xs
---

# Turbo Frames

<br>

<CodeCaption caption="app/views/feeds/_title.html.erb">

```erb
<%= turbo_frame_tag dom_id(feed, :title) do %>
  <h3>
    <%= link_to feed.title, edit_feed_title_path(feed) %>
  </h3>
<% end %>
```

</CodeCaption>

<br>

<CodeCaption caption="app/views/feeds/titles/edit.html.erb">

```erb
<%= turbo_frame_tag dom_id(@feed, :title) do %>
  <%= form_with model: @feed,
        url: feed_title_path(@feed),
        method: :patch do |form| %>
    <%= form.text_field :title %>
    <%= form.submit "Save" %>
  <% end %>
<% end %>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/turbo-frames-demo.mp4" maxH="max-h-105" />

<!--
Turbo Frames allow you to update a specific part of the page without changing the entire page.

In this example, we allow the user to edit the title of a feed by clicking on the title.
Clicking on the title performs a request that loads a form with a textbox inline.
Changing the title and clicking save performs a request that updates the title and shows the new title.

Importantly, only what's inside the turbo frame changes on each request.

This works because the turbo frame has the same ID across requests.
-->

---
layout: two-cols
class: text-xs
---

# Turbo Streams

<br>

<CodeCaption caption="app/controllers/entries_controller.rb">

```ruby
def toggle_ignore
  @entry = current_user.entries.find(params[:id])
  @entry.update(ignored_at: Time.current)
end
```

</CodeCaption>

<br>

<CodeCaption caption="app/views/entries/toggle_ignore.turbo_stream.erb">

```erb
<%= turbo_stream.remove dom_id(@entry, :card) %>
```

</CodeCaption>

::right::

<div class="h-full relative" style="z-index: 1">

<DemoVideo src="/videos/turbo-streams-demo.mp4" maxH="max-h-105" />

</div>

<div class="absolute inset-0 pointer-events-none" style="z-index: 200">
  <FancyArrow from="(866,52)" to="(729,110)" color="#dc2626" width="2.5" head-size="18" roughness="1.2" arc="0.25" seed="11" />
  <div v-drag="[792,18,150,24]" class="text-sm font-bold text-red-600 whitespace-nowrap text-right">unread count</div>
</div>

<!--
Turbo Streams allows updating many different parts of the page.

For example, if the user clicks the Ignore button, we can respond with a turbo stream request that says to remove the entire entry card after we set the entry to be ignored in the database.
-->

---
layout: two-cols
class: text-xs
---

# Stimulus

<br>

<CodeCaption caption="app/javascript/controllers/toast_controller.js">

```js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.timeout = setTimeout(() => {
      this.element.remove()
    }, 5000)
  }

  disconnect() {
    clearTimeout(this.timeout)
  }
}
```

</CodeCaption>

<br>

<CodeCaption caption="app/views/shared/_flash_toasts.html.erb">

```erb
<div class="toast" data-controller="toast">
  <h2><%= flash[:notice] %></h2>
</div>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/stimulus-demo.mp4" maxH="max-h-105" />

<!--
When Turbo isn't enough and you need some custom Javascript, you can use Stimulus.

I like to think of Stimulus as a more structured version of jQuery.

For example, if we want to show the user a toast message and have it disappear after five seconds, Stimulus is a great choice.

We set the data-controller attribute on the element which tells Stimulus to connect to that controller.

Then we set a timeout that removes the element after five seconds have passed.
-->

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

<!--
How do you get started with a Hotwire Native project?
-->

---
layout: statement
---

# Start with a Hotwire Rails app

---
layout: statement
---

# No generator like `rails new` for the mobile app

---
layout: statement
---

# Hotwire Native apps are Native apps

---
layout: image-right
image: /images/setup-ios-xcode-template.png
backgroundSize: 90%
---

# Project Setup

## iOS

<br>

- Use the Xcode New Project Wizard

---
layout: image-right
image: /images/setup-ios-package-dependency.png
backgroundSize: 90%
---

<!--
To get started with iOS, you can use the Xcode new project wizard.
-->

# Project Setup

## iOS

<br>

- Add `hotwire-native-ios` package dependency

<!--
There's a Swift package called `hotwire-native-ios` and that's what you'll use to turn your native app into a Hotwire Native app
-->

---
layout: two-cols
---

# Project Setup

## iOS

<br>

- Replace `SceneDelegate.swift`

::right::

<VCenter>

<CodeCaption caption="SceneDelegate.swift" size="xs">

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

    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        window?.rootViewController = navigator.rootViewController
        navigator.start()
    }
}
```

</CodeCaption>

</VCenter>

<!--
The only change you'll need to make is to replace the entry point of the app with a small bit of code that tells Hotwire Native the starting location of your web app.
-->

---
layout: image-right
image: /images/setup-android-new-project.png
backgroundSize: 90%
---

# Project Setup

## Android

<br>

- Use the Android Studio New Project Wizard

<!--
Android has a similar new project wizard.
-->

---
layout: two-cols
---

# Project Setup

## Android

<br>

- Add `hotwire-native-android` dependency

::right::

<VCenter>

<CodeCaption caption="app/build.gradle.kts" size="xs">

```kotlin
dependencies {
    implementation("dev.hotwire:core:${libs.versions.hotwireNative}")
    implementation(
        "dev.hotwire:navigation-fragments:${libs.versions.hotwireNative}"
    )
}
```

</CodeCaption>

</VCenter>

<!--
Android has a `hotwire-native-android` Kotlin library that needs to be added to your dependencies.
-->

---
layout: two-cols
---

# Project Setup

## Android

<br>

- Enable internet access

::right::

<VCenter>

<CodeCaption caption="app/src/main/AndroidManifest.xml" size="xs">

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

</CodeCaption>

</VCenter>

<!--
Android has requires a little more than iOS to get started. Start by asking for the internet permission for your app. This tells Android that you need to be able to call your web app from within your native app.
-->

---
layout: two-cols
---

# Project Setup

## Android

<br>

- Replace `MainActivity.kt`

::right::

<VCenter>

<CodeCaption caption="MainActivity.kt" size="xs">

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

</CodeCaption>

</VCenter>

<!--
Similar to iOS, the entry point for the Kotlin app needs to be updated with the starting location URL of your web app.
-->

---
layout: two-cols
---

# Project Setup

## Android

<br>

- Replace `activity_main.xml`

::right::

<VCenter>

<CodeCaption caption="activity_main.xml" size="xs">

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

</CodeCaption>

</VCenter>

<!--
XML still seems pretty popular in the Java world so you've also got a bit of XML to add.
-->

---

# Project Setup

## Alternative

<img v-drag="[28,210,450,235]" src="/images/setup-alternative-1.png" class="rounded shadow-lg" />

<img v-drag="[502,210,450,233]" src="/images/setup-alternative-2.png" class="rounded shadow-lg" />

<!--
Alternatively, you can download these examples apps hosted in the official libraries and modify them instead of starting native projects from scratch.
-->

---
layout: section
---

# Screen Navigation

---
layout: two-cols
class: gap-4
---

# Screen Navigation

## Push and Pop

<br>

<CodeCaption caption="app/views/feeds/_card.html.erb">

```erb
<%= link_to "View", feed_path(feed) %>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/nav-push-pop.mp4" />

<!--
Links will push a new screen onto the stack and use an animation
-->

---
layout: two-cols
class: gap-4 text-xs
---

# Screen Navigation

## Replace

<br>

<CodeCaption caption="app/views/users/edit.html.erb">

```erb
<%= form_with model: @user do |form| %>
  <div class="grid gap-2">
    <%= form.label :email_address, "New Email Address" %>
    <%= form.email_field :email_address %>
  </div>

  <div class="grid gap-2">
    <%= form.label :current_password %>
    <%= form.password_field :current_password %>
  </div>

  <%= form.submit "Update Email" %>
<% end %>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/nav-replace.mp4" />

<!--
Navigating to the same screen will replace the screen instead of pushing a new screen
-->

---
layout: two-cols
class: gap-4 text-xs
---

# Screen Navigation

## External Links

<br>

<CodeCaption caption="app/views/entries/_card.html.erb">

```erb
<%= link_to entry.title,
    entry.url,
    target: "_blank",
    rel: "noopener noreferrer" %>
```

</CodeCaption>

::right::

<DemoVideo src="/videos/nav-external-links.mp4" />

---
layout: section
---

# Path Configuration

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

<DemoVideo src="/videos/pathconfig-basic.mp4" />

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

<DemoVideo src="/videos/pathconfig-modal.mp4" />

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

```ruby
{
  rules: [
    {
      patterns: [
        "#{entries_path}$"
      ],
      properties: {
        view_controller: "entries",
        presentation: "replace_root",
        animated: false,
        pull_to_refresh_enabled: false
      }
    }
  ]
}
```

::right::

<DemoVideo src="/videos/pathconfig-native-screen.mp4" />

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

<CodeCaption caption="application.html.erb" size="sm">

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

</CodeCaption>

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

<DemoVideo src="/videos/tabbar-ios.mp4" />

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## iOS

<br />

```swift
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

::right::

<DemoVideo src="/videos/tabbar-ios.mp4" />

---
layout: two-cols
class: gap-4 text-sm
---

# Native Tab Bar

## iOS

<br />

<CodeCaption caption="SceneController.swift" size="xs">

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

</CodeCaption>

::right::

<DemoVideo src="/videos/tabbar-ios.mp4" />

---
layout: two-cols
class: gap-4
---

# Native Tab Bar

## Android

<br />

<CodeCaption caption="Tabs.kt">

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

</CodeCaption>

::right::

<DemoVideo src="/videos/tabbar-android.mp4" />

---
layout: two-cols
class: gap-4
---

# Native Tab Bar

## Android

<br />

<CodeCaption caption="activity_main.xml" size="xs">

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout>

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

</CodeCaption>

::right::

<DemoVideo src="/videos/tabbar-android.mp4" />

---
layout: two-cols
class: gap-4
---

# Native Tab Bar

## Android

<br />

<CodeCaption caption="MainActivity.kt" size="xs">

```kotlin
class MainActivity : HotwireActivity() {
    private lateinit var
      bottomNavigationController: HotwireBottomNavigationController

    override fun onCreate(savedInstanceState: Bundle?) {
        ...

        initializeBottomTabs()
    }

    private fun initializeBottomTabs() {
        val bottomNavigationView = findViewById<BottomNavigationView>(
            R.id.bottom_nav
        )
        bottomNavigationController = HotwireBottomNavigationController(
            this, bottomNavigationView
        )
        bottomNavigationController.load(mainTabs, 0)
    }
}
```

</CodeCaption>

::right::

<DemoVideo src="/videos/tabbar-android.mp4" />

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

<DemoVideo src="/videos/calendar-switcher-web.mp4" />

---
layout: two-cols
---

# Calendar Switcher

## iOS App (HTML Dialog)

::right::

<DemoVideo src="/videos/calendar-switcher-html-dialog.mp4" />

---
layout: two-cols
---

# Calendar Switcher

## iOS App (Native Modal)

::right::

<DemoVideo src="/videos/calendar-switcher-native-modal.mp4" />

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

<DemoVideo src="/videos/bridge-button-demo.mp4" />

---
layout: two-cols
---

# Bridge Components

## Navigation Bar Menu

<img src="/images/bridge-menu.png" class="max-h-80 mt-4 rounded shadow-lg" />

::right::

<DemoVideo src="/videos/bridge-menu-demo.mp4" />

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
layout: image
image: /images/masilotti-library.png
backgroundSize: contain
title: Joe Masilotti's Bridge Components library
---

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

<DemoVideo src="/videos/add-to-calendar-ios.mp4" />

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

<CodeCaption caption="AddToCalendarController.swift" size="xs">

```swift
class AddToCalendarController: NSObject {
    private weak var window: UIWindow?

    init(window: UIWindow?) {
        self.window = window
        super.init()
    }

    func addToCalendar(calendarEventId: Int) async {
        let url = baseUrl
            .appendingPathComponent("calendar_events/\(calendarEventId)")
        let viewModel = CalendarEventViewModel(url: url)
        await viewModel.fetchCalendarEvent()

        guard let calendarEvent = viewModel.calendarEvent else {
            print("Error: Could not fetch calendar event")
            return
        }

        let event = EKEvent(eventStore: CalendarEventStore.shared)
        event.calendar = CalendarEventStore.shared.defaultCalendarForNewEvents
        event.title = calendarEvent.name
        ...

        await MainActor.run {
            let eventViewController = AddToCalendarEKEventEditViewController()
            eventViewController.calendarEventId = calendarEventId
            eventViewController.event = event
            eventViewController.eventStore = CalendarEventStore.shared
            eventViewController.editViewDelegate = self
            window?.rootViewController?
                .present(eventViewController, animated: true)
        }
    }
}
```

</CodeCaption>

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

<CodeCaption caption="AddToCalendarController.swift" size="xs">

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

</CodeCaption>

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

<DemoVideo src="/videos/add-to-calendar-android.mp4" />

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

<CodeCaption size="xs">

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

</CodeCaption>

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

<div class="flex gap-12 items-start justify-center mt-8">
  <div class="flex flex-col items-center gap-2">
    <img src="/images/calendar-vision-app.png" class="max-h-60 rounded shadow-lg" />
    <div class="text-sm opacity-80">Calendar Vision app · calendarvision.app</div>
  </div>
  <div class="flex flex-col items-center gap-2">
    <img src="/images/qr-code.png" class="max-h-60 rounded shadow-lg" />
    <div class="text-sm opacity-80">Find me online · mikedalton.co/socials</div>
  </div>
</div>
