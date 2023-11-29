class SessionStorageManager {

  static setItemInSessionStorage(key: string, value: string) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao definir item no sessionStorage:", error);
    }
  }

  static getItemFromSessionStorage(key: string | null | undefined) {
    if (typeof key === "string" && key.trim() !== "") {
      try {
        const storedItem = sessionStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
      } catch (error) {
        console.error("Erro ao obter item do sessionStorage:", error);
        return null;
      }
    } else if (key === undefined || key === null) {
      console.error("Chave não fornecida para obter item do sessionStorage");
      return null;
    } else {
      console.error("Chave inválida para obter item do sessionStorage");
      return null;
    }
  }

  static removeItemFromSessionStorage(key: string | null | undefined) {
    
    if (typeof key === "string" && key.trim() !== "") {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error("Erro ao remover item do sessionStorage:", error);
      }
    } else if (key === undefined || key === null) {
      console.error("Chave não fornecida para remoção no sessionStorage");
    } else {
      console.error("Chave inválida para remoção no sessionStorage");
    }
  }

  static clearSessionStorage() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Erro ao limpar sessionStorage:", error);
    }
  }
}

export default SessionStorageManager;
