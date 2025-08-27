import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";

const { width } = Dimensions.get("window");

// Ana App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { id: "home", title: "Ana Sayfa", emoji: "🏠" },
    { id: "profile", title: "Profil", emoji: "👤" },
    { id: "settings", title: "Ayarlar", emoji: "⚙️" },
    { id: "favorites", title: "Favoriler", emoji: "⭐" },
    { id: "help", title: "Yardım", emoji: "❓" },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const selectPage = (pageId) => {
    setCurrentPage(pageId);
    setMenuVisible(false);
  };

  const getCurrentPageData = () => {
    return menuItems.find((item) => item.id === currentPage) || menuItems[0];
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>🏠 Ana Sayfa</Text>
            <Text style={styles.pageSubtitle}>Hoş Geldiniz!</Text>

            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeText}>
                Bu basit drawer navigation örneğidir. Sol üst köşedeki menü
                butonuna tıklayarak diğer sayfalara geçebilirsiniz.
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Sayfa</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>100%</Text>
                <Text style={styles.statLabel}>Expo Uyumlu</Text>
              </View>
            </View>
          </View>
        );

      case "profile":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>👤 Profil</Text>

            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AY</Text>
              </View>
              <Text style={styles.profileName}>Ahmet Yılmaz</Text>
              <Text style={styles.profileEmail}>ahmet@example.com</Text>
              <Text style={styles.profilePhone}>+90 555 123 45 67</Text>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Üyelik Tarihi:</Text>
                <Text style={styles.infoValue}>15 Ocak 2024</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Son Giriş:</Text>
                <Text style={styles.infoValue}>Bugün, 14:30</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Durum:</Text>
                <Text style={styles.infoValueActive}>Aktif</Text>
              </View>
            </View>
          </View>
        );

      case "settings":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>⚙️ Ayarlar</Text>

            <View style={styles.settingsList}>
              {[
                { label: "Bildirimler", value: "Açık", color: "#22c55e" },
                { label: "Karanlık Mod", value: "Kapalı", color: "#64748b" },
                { label: "Dil", value: "Türkçe", color: "#3b82f6" },
                { label: "Konum", value: "İzin Verilen", color: "#22c55e" },
                { label: "Otomatik Yedek", value: "Açık", color: "#22c55e" },
              ].map((setting, index) => (
                <TouchableOpacity key={index} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{setting.label}</Text>
                  <Text style={[styles.settingValue, { color: setting.color }]}>
                    {setting.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case "favorites":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>⭐ Favoriler</Text>

            <View style={styles.favoritesList}>
              {[
                { title: "React Native Öğren", category: "Eğitim" },
                { title: "Expo Dokümantasyon", category: "Kaynak" },
                { title: "JavaScript ES6+", category: "Dil" },
                { title: "Mobile UI Design", category: "Tasarım" },
              ].map((item, index) => (
                <View key={index} style={styles.favoriteItem}>
                  <View>
                    <Text style={styles.favoriteTitle}>{item.title}</Text>
                    <Text style={styles.favoriteCategory}>{item.category}</Text>
                  </View>
                  <Text style={styles.favoriteIcon}>⭐</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "help":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>❓ Yardım</Text>

            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Sık Sorulan Sorular</Text>

              {[
                {
                  q: "Nasıl kullanırım?",
                  a: "Sol üst köşedeki menü butonuna tıklayarak sayfalar arası geçiş yapabilirsiniz.",
                },
                {
                  q: "Ayarları nasıl değiştiririm?",
                  a: "Ayarlar sayfasından tüm uygulama ayarlarınızı yönetebilirsiniz.",
                },
                {
                  q: "Destek nasıl alabilirim?",
                  a: "support@example.com adresine yazarak destek alabilirsiniz.",
                },
              ].map((item, index) => (
                <View key={index} style={styles.helpItem}>
                  <Text style={styles.helpQuestion}>{item.q}</Text>
                  <Text style={styles.helpAnswer}>{item.a}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      default:
        return <Text>Sayfa bulunamadı</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getCurrentPageData().title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>{renderPageContent()}</ScrollView>

      {/* Overlay */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleMenu}
          activeOpacity={1}
        />
      )}

      {/* Side Menu */}
      {menuVisible && (
        <View style={styles.sideMenu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menü</Text>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.menuContent}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  currentPage === item.id && styles.activeMenuItem,
                ]}
                onPress={() => selectPage(item.id)}
              >
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.menuText,
                    currentPage === item.id && styles.activeMenuText,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.menuFooter}>
            <Text style={styles.footerText}>v1.0.0</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  pageContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 10,
  },
  pageSubtitle: {
    fontSize: 18,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  welcomeCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  welcomeText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6366f1",
  },
  statLabel: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 5,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 3,
  },
  profilePhone: {
    fontSize: 16,
    color: "#64748b",
  },
  profileInfo: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  infoLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  infoValue: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  infoValueActive: {
    fontSize: 16,
    color: "#22c55e",
    fontWeight: "500",
  },
  settingsList: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  settingLabel: {
    fontSize: 16,
    color: "#1e293b",
  },
  settingValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  favoritesList: {
    gap: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e293b",
  },
  favoriteCategory: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  helpSection: {
    gap: 15,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
  },
  helpItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  helpAnswer: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6366f1",
    padding: 20,
    paddingTop: 50,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  menuContent: {
    flex: 1,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginVertical: 2,
  },
  activeMenuItem: {
    backgroundColor: "#f1f5f9",
  },
  menuEmoji: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  activeMenuText: {
    color: "#6366f1",
    fontWeight: "bold",
  },
  menuFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
  },
});
