import { supabase } from "../lib/supabase";

describe("API Verify - Test de seguridad", () => {
  it("Debe devolver CLON INVALIDADO si el folio es falso", async () => {
    const { data } = await supabase
      .from("kronos_certificados")
      .select("*")
      .eq("folio", "FAKE-FOLIO-001")
      .single();

    expect(data).toBeNull();
  });
});