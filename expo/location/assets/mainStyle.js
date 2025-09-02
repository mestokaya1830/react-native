
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#ffe6e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4757",
  },
  errorText: {
    color: "#d63031",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#ff4757",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  locationContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2d3436",
    textAlign: "center",
  },
  addressContainer: {
    backgroundColor: "#e8f4f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  addressText: {
    fontSize: 14,
    color: "#2d3436",
    textAlign: "center",
    fontStyle: "italic",
  },
  coordsContainer: {
    marginBottom: 20,
  },
  coordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  coordLabel: {
    fontSize: 14,
    color: "#636e72",
    fontWeight: "500",
  },
  coordValue: {
    fontSize: 14,
    color: "#2d3436",
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#ff4757",
  },
  secondaryButton: {
    backgroundColor: "#00cec9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  accuracyContainer: {
    marginTop: 20,
  },
  accuracyButton: {
    backgroundColor: "#f1f2f6",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
  },
  selectedAccuracy: {
    backgroundColor: "#007AFF",
  },
  accuracyText: {
    fontSize: 12,
    color: "#636e72",
    textAlign: "center",
  },
  selectedAccuracyText: {
    color: "white",
    fontWeight: "bold",
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  historyIndex: {
    fontSize: 12,
    color: "#74b9ff",
    fontWeight: "bold",
    width: 30,
  },
  historyDetails: {
    flex: 1,
  },
  historyCoords: {
    fontSize: 14,
    color: "#2d3436",
    fontWeight: "500",
  },
  historyTime: {
    fontSize: 12,
    color: "#636e72",
    marginTop: 2,
  },
});

export default styles;