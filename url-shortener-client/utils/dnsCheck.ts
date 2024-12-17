export async function checkUrlValidity(url: string): Promise<boolean> {
    try {
      const hostname = new URL(url).hostname;
      const response = await fetch(`https://dns.google/resolve?name=${hostname}`);
      const data = await response.json();
      return data.Status === 0; // Status 0 indicates success
    } catch (error) {
      return false;
    }
  }
  