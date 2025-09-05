// Expo SQLite ile CRUD örneği
// expo install expo-sqlite

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import * as SQLite from "expo-sqlite";

export default function ExpoSQLiteCRUD() {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Veritabanı başlatma
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabaseAsync("users.db");
        setDb(database);

        // Tablo oluşturma
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER NOT NULL
          );
        `);

        loadUsers(database);
      } catch (error) {
        console.error("Database init error:", error);
        Alert.alert("Hata", "Veritabanı başlatılamadı");
      }
    };

    initDB();
  }, []);

  // Kullanıcıları yükleme (READ)
  const loadUsers = useCallback(
    async (database = db) => {
      if (!database) return;

      try {
        const result = await database.getAllAsync(
          "SELECT * FROM users ORDER BY id DESC"
        );
        setUsers(result);
      } catch (error) {
        console.error("Load users error:", error);
        Alert.alert("Hata", "Kullanıcılar yüklenemedi");
      }
    },
    [db]
  );

  // Yeni kullanıcı ekleme (CREATE)
  const addUser = async () => {
    if (!db || !name.trim() || !email.trim() || !age.trim()) {
      Alert.alert("Hata", "Tüm alanları doldurun!");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name.trim(), email.trim(), parseInt(age)]
      );

      clearForm();
      loadUsers();
      Alert.alert("Başarılı", "Kullanıcı eklendi!");
    } catch (error) {
      console.error("Add user error:", error);
      Alert.alert("Hata", "Kullanıcı eklenemedi: " + error.message);
    }
  };

  // Kullanıcı güncelleme (UPDATE)
  const updateUser = async () => {
    if (!db || !editingId || !name.trim() || !email.trim() || !age.trim()) {
      Alert.alert("Hata", "Tüm alanları doldurun!");
      return;
    }

    try {
      await db.runAsync(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
        [name.trim(), email.trim(), parseInt(age), editingId]
      );

      clearForm();
      loadUsers();
      Alert.alert("Başarılı", "Kullanıcı güncellendi!");
    } catch (error) {
      console.error("Update user error:", error);
      Alert.alert("Hata", "Kullanıcı güncellenemedi: " + error.message);
    }
  };

  // Kullanıcı silme (DELETE)
  const deleteUser = (id) => {
    Alert.alert(
      "Silme Onayı",
      "Bu kullanıcıyı silmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            try {
              await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
              loadUsers();
              Alert.alert("Başarılı", "Kullanıcı silindi!");
            } catch (error) {
              console.error("Delete user error:", error);
              Alert.alert("Hata", "Kullanıcı silinemedi: " + error.message);
            }
          },
        },
      ]
    );
  };

  // Düzenleme için formu doldurma
  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
  };

  // Formu temizleme
  const clearForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditingId(null);
  };

  // Kullanıcı sayısını alma
  const getUserCount = async () => {
    if (!db) return;

    try {
      const result = await db.getFirstAsync(
        "SELECT COUNT(*) as count FROM users"
      );
      Alert.alert("İstatistik", `Toplam kullanıcı: ${result.count}`);
    } catch (error) {
      console.error("Count error:", error);
    }
  };

  // Kullanıcı listesi render
  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDetails}>
          {item.email} - {item.age} yaş
        </Text>
        <Text style={styles.userId}>ID: {item.id}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editUser(item)}
        >
          <Text style={styles.buttonText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteUser(item.id)}
        >
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo SQLite CRUD</Text>
      <Link href="/getdbinfo" style={{ marginBottom: 20, alignSelf: "center" }}>
        <Text style={{ color: "#007bff" }}>Veritabanı Bilgisi & Yedekleme</Text>
      </Link>
      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="İsim"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Yaş"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={editingId ? updateUser : addUser}
          >
            <Text style={styles.buttonText}>
              {editingId ? "Güncelle" : "Ekle"}
            </Text>
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={clearForm}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.listTitle}>Kullanıcılar ({users.length})</Text>
        <TouchableOpacity style={styles.countButton} onPress={getUserCount}>
          <Text style={styles.countButtonText}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Kullanıcı Listesi */}
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  form: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 100,
  },
  primaryButton: {
    backgroundColor: "#007bff",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  countButton: {
    padding: 8,
  },
  countButtonText: {
    fontSize: 18,
  },
  list: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  userId: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  userActions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});
