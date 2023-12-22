class SessionStorageManager {

  static setItemInSessionStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao definir item no localStorage:", error);
    }
  }

  static getItemFromSessionStorage(key: string | null | undefined) {
    if (typeof key === "string" && key.trim() !== "") {
      try {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
      } catch (error) {
        console.error("Erro ao obter item do localStorage:", error);
        return null;
      }
    } else if (key === undefined || key === null) {
      console.error("Chave não fornecida para obter item do localStorage");
      return null;
    } else {
      console.error("Chave inválida para obter item do localStorage");
      return null;
    }
  }

  static removeItemFromSessionStorage(key: string | null | undefined) {
    
    if (typeof key === "string" && key.trim() !== "") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Erro ao remover item do localStorage:", error);
      }
    } else if (key === undefined || key === null) {
      console.error("Chave não fornecida para remoção no localStorage");
    } else {
      console.error("Chave inválida para remoção no localStorage");
    }
  }

  static clearSessionStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Erro ao limpar localStorage:", error);
    }
  }
}

export default SessionStorageManager;
