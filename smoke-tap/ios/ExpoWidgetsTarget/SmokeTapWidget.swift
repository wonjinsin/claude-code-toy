import WidgetKit
import SwiftUI
internal import ExpoWidgets

struct SmokeTapWidget: Widget {
  let name: String = "SmokeTapWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: name, provider: WidgetsTimelineProvider(name: name)) { entry in
      WidgetsEntryView(entry: entry)
    }
    .configurationDisplayName("Smoke Tap")
    .description("오늘 흡연 횟수를 기록하세요")
    .supportedFamilies([.systemSmall])
  }
}