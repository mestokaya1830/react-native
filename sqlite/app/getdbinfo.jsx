import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import {View, Alert, Pressable, Text } from "react-native";

// Veritabanı yolunu öğrenme
const getDatabaseInfo = async () => {
  try {
    // Veritabanını aç
    const db = await SQLite.openDatabaseAsync("users.db");

    // SQLite dosyalarının bulunduğu dizin
    const sqliteDirectory = `${FileSystem.documentDirectory}SQLite/`;
    const dbPath = `${sqliteDirectory}users.db`;

    console.log("=== DATABASE INFO ===");
    console.log("Document Directory:", FileSystem.documentDirectory);
    console.log("SQLite Directory:", sqliteDirectory);
    console.log("Database Path:", dbPath);

    // Dosya var mı kontrol et
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log("File exists:", fileInfo.exists);
    console.log("File size:", fileInfo.size, "bytes");
    console.log("Modified:", new Date(fileInfo.modificationTime * 1000));

    // Alert ile göster
    Alert.alert(
      "Database Info",
      `Path: ${dbPath}\nExists: ${fileInfo.exists}\nSize: ${fileInfo.size} bytes`
    );

    return {
      documentDirectory: FileSystem.documentDirectory,
      sqliteDirectory: sqliteDirectory,
      dbPath: dbPath,
      fileExists: fileInfo.exists,
      fileSize: fileInfo.size,
    };
  } catch (error) {
    console.error("Database info error:", error);
    Alert.alert("Hata", "Database bilgisi alınamadı");
  }
};

// Tüm SQLite dosyalarını listele
const listSQLiteFiles = async () => {
  try {
    const sqliteDir = `${FileSystem.documentDirectory}SQLite/`;

    // Dizin var mı kontrol et
    const dirInfo = await FileSystem.getInfoAsync(sqliteDir);

    if (dirInfo.exists) {
      const files = await FileSystem.readDirectoryAsync(sqliteDir);
      console.log("SQLite files:", files);

      // Her dosyanın bilgisini al
      for (const file of files) {
        const filePath = `${sqliteDir}${file}`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        console.log(`${file}: ${fileInfo.size} bytes`);
      }

      Alert.alert("SQLite Files", files.join("\n") || "No files found");
    } else {
      console.log("SQLite directory does not exist");
      Alert.alert("Info", "SQLite directory does not exist yet");
    }
  } catch (error) {
    console.error("List files error:", error);
  }
};

// Database dosyasını kopyala (backup)
const backupDatabase = async () => {
  try {
    const sourcePath = `${FileSystem.documentDirectory}SQLite/users.db`;
    const backupPath = `${
      FileSystem.documentDirectory
    }users_backup_${Date.now()}.db`;

    // Kaynak dosya var mı kontrol et
    const sourceInfo = await FileSystem.getInfoAsync(sourcePath);

    if (sourceInfo.exists) {
      await FileSystem.copyAsync({
        from: sourcePath,
        to: backupPath,
      });

      Alert.alert("Backup", `Database backed up to:\n${backupPath}`);
      console.log("Backup created:", backupPath);
    } else {
      Alert.alert("Error", "Source database not found");
    }
  } catch (error) {
    console.error("Backup error:", error);
    Alert.alert("Error", "Backup failed");
  }
};

// Database boyutunu kontrol et
const getDatabaseSize = async () => {
  try {
    const dbPath = `${FileSystem.documentDirectory}SQLite/users.db`;
    const fileInfo = await FileSystem.getInfoAsync(dbPath);

    if (fileInfo.exists) {
      const sizeInKB = (fileInfo.size / 1024).toFixed(2);
      const sizeInMB = (fileInfo.size / (1024 * 1024)).toFixed(2);

      Alert.alert(
        "Database Size",
        `${fileInfo.size} bytes\n${sizeInKB} KB\n${sizeInMB} MB`
      );

      return fileInfo.size;
    } else {
      Alert.alert("Info", "Database file not found");
      return 0;
    }
  } catch (error) {
    console.error("Size check error:", error);
    return 0;
  }
};

// Database temizle
const clearDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("users.db");
    await db.execAsync("DELETE FROM users");

    Alert.alert("Success", "All records deleted");
    console.log("Database cleared");
  } catch (error) {
    console.error("Clear error:", error);
    Alert.alert("Error", "Failed to clear database");
  }
};

// Örnek kullanım komponenti
export default function DatabaseInfo() {
  return (
    <View style={{ padding: 20, paddingTop: 50 }}>
      <Pressable style={styles.button} onPress={getDatabaseInfo}>
        <Text style={styles.buttonText}>Get DB Info</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={listSQLiteFiles}>
        <Text style={styles.buttonText}>List SQLite Files</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={getDatabaseSize}>
        <Text style={styles.buttonText}>Get DB Size</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={backupDatabase}>
        <Text style={styles.buttonText}>Backup Database</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#dc3545" }]}
        onPress={clearDatabase}
      >
        <Text style={styles.buttonText}>Clear Database</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
};
