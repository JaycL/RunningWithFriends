export class ModelUser {  
    constructor(public id: string,                
                public pseudo: string,
                public epreuvesInscrit: string[],
                public epreuvesAttente: string[]) {}        
}