import WidgetKit
import SwiftUI
import AppIntents

struct SmokeTapEntry: TimelineEntry {
    let date: Date
    let count: Int
}

struct SmokeTapProvider: TimelineProvider {
    func placeholder(in context: Context) -> SmokeTapEntry {
        SmokeTapEntry(date: Date(), count: 0)
    }
    func getSnapshot(in context: Context, completion: @escaping (SmokeTapEntry) -> Void) {
        completion(SmokeTapEntry(date: Date(), count: SharedTapStore.getBaseCount() + SharedTapStore.getPendingCount()))
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<SmokeTapEntry>) -> Void) {
        let entry = SmokeTapEntry(date: Date(), count: SharedTapStore.getBaseCount() + SharedTapStore.getPendingCount())
        completion(Timeline(entries: [entry], policy: .never))
    }
}

private extension Color {
    init(hex: String) {
        var int: UInt64 = 0
        Scanner(string: hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)).scanHexInt64(&int)
        self.init(red: Double((int >> 16) & 0xFF) / 255, green: Double((int >> 8) & 0xFF) / 255, blue: Double(int & 0xFF) / 255)
    }
}

private extension View {
    @ViewBuilder
    func widgetBackground(_ color: Color) -> some View {
        if #available(iOS 17.0, *) {
            self.containerBackground(color, for: .widget)
        } else {
            self.background(color)
        }
    }
}

struct SmokeTapWidgetView: View {
    let entry: SmokeTapEntry
    var body: some View {
        VStack(spacing: 4) {
            Text("오늘")
                .font(.system(size: 10, weight: .semibold))
                .foregroundColor(Color(hex: "5c5854"))
            Text("\(entry.count)")
                .font(.system(size: 44, weight: .bold))
                .foregroundColor(Color(hex: "f0ece6"))
            Text("회")
                .font(.system(size: 11))
                .foregroundColor(Color(hex: "8c8580"))
            if #available(iOS 17.0, *) {
                Button(intent: RecordTapIntent()) {
                    Text("+")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(Color(hex: "121110"))
                        .frame(width: 32, height: 32)
                        .background(Color(hex: "e8991a"))
                        .clipShape(Circle())
                }.buttonStyle(.plain)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .widgetBackground(Color(hex: "121110"))
    }
}

struct SmokeTapWidget: Widget {
    let name = "SmokeTapWidget"
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: name, provider: SmokeTapProvider()) { entry in
            SmokeTapWidgetView(entry: entry)
        }
        .configurationDisplayName("Smoke Tap")
        .description("오늘 흡연 횟수를 기록하세요")
        .supportedFamilies([.systemSmall])
    }
}
