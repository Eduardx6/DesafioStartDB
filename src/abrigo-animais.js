class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex:   { tipo: "cão",   favoritos: ["RATO", "BOLA"] },
      Mimi:  { tipo: "gato",  favoritos: ["BOLA", "LASER"] },
      Fofo:  { tipo: "gato",  favoritos: ["BOLA", "RATO", "LASER"] },
      Zero:  { tipo: "gato",  favoritos: ["RATO", "BOLA"] },
      Bola:  { tipo: "cão",   favoritos: ["CAIXA", "NOVELO"] },
      Bebe:  { tipo: "cão",   favoritos: ["LASER", "RATO", "BOLA"] },
      Loco:  { tipo: "jabuti", favoritos: ["SKATE", "RATO"] }
    };

    this.brinquedosValidos = [
      "RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"
    ];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const listaAdotados = [];
      const adotados = [];

      // Função para validar brinquedos
      const validarBrinquedos = (brinquedos) => {
        const arr = brinquedos.split(',').map(b => b.trim());
        const duplicados = arr.filter((item, idx) => arr.indexOf(item) !== idx);
        if (duplicados.length) throw { erro: 'Brinquedo inválido' };
        for (let b of arr) {
          if (!this.brinquedosValidos.includes(b)) throw { erro: 'Brinquedo inválido' };
        }
        return arr;
      };

      const lista1 = validarBrinquedos(brinquedosPessoa1);
      const lista2 = validarBrinquedos(brinquedosPessoa2);

      // Validar animais
      const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());
      const seen = new Set();
      for (let a of animaisOrdem) {
        if (!this.animais[a]) throw { erro: 'Animal inválido' };
        if (seen.has(a)) throw { erro: 'Animal inválido' };
        seen.add(a);
      }

      // Processar cada animal
      for (let nome of animaisOrdem) {
        const animal = this.animais[nome];
        const pode1 = this.podeAdotar(lista1, animal, adotados);
        const pode2 = this.podeAdotar(lista2, animal, adotados);

        if (pode1 && !pode2) {
          listaAdotados.push(`${nome} - pessoa 1`);
          adotados.push(nome);
        } else if (!pode1 && pode2) {
          listaAdotados.push(`${nome} - pessoa 2`);
          adotados.push(nome);
        } else if (pode1 && pode2) {
          listaAdotados.push(`${nome} - abrigo`);
        } else {
          listaAdotados.push(`${nome} - abrigo`);
        }
      }

      // Ordenar alfabeticamente
      listaAdotados.sort((a, b) => {
        const nomeA = a.split(' - ')[0];
        const nomeB = b.split(' - ')[0];
        return nomeA.localeCompare(nomeB);
      });

      return { lista: listaAdotados };
    } catch (err) {
      return err;
    }
  }

  podeAdotar(listaBrinquedos, animal, jaAdotados) {
    // Regra do Loco
    if (animal === this.animais.Loco) {
      return jaAdotados.length > 0;
    }
    // Gatos não dividem brinquedos
    if (animal.tipo === "gato") {
      return this.contemNaOrdem(listaBrinquedos, animal.favoritos);
    }
    // Para cães e outros
    return this.contemNaOrdem(listaBrinquedos, animal.favoritos);
  }

  contemNaOrdem(listaPessoa, favoritos) {
    let i = 0;
    for (let item of listaPessoa) {
      if (item === favoritos[i]) {
        i++;
      }
      if (i === favoritos.length) return true;
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };