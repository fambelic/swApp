package com.adservice.service;

import com.adservice.ad.AdRepository;
import com.adservice.ad.Annuncio;
import com.adservice.ad.Categories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
@Component
public class AdService {

    @Autowired
    private AdRepository adRepository;
    @Autowired
    private Categories categoriesTree;
    public ArrayList<Annuncio> getAnnunci(String username){
        return adRepository.findAnnunciByOwner(username);
    }


    private boolean checkFields(Annuncio annuncio){
        return annuncio.getDescrizione() != null && annuncio.getCategorie() != null && annuncio.getImage() != null && annuncio.getStato() != null && annuncio.getTitolo() != null;
    }
    public boolean createAnnuncio(Annuncio annuncio){
        if (!checkFields(annuncio) || !categoriesTree.isValid(annuncio.getCategorie())) return false;
        if (adRepository.findAnnuncioByOwnerAndTitle(annuncio.getOwner(),annuncio.getTitolo()) != null) return false;
        annuncio.setExclusive(false);
        adRepository.save(annuncio);
        return true;
    }

    public boolean createAndLike(Annuncio annuncio, String id,StreamBridge streamBridge,String owner){
        //CREATE
        Annuncio main_annuncio = adRepository.findAnnuncioById(id);
        if(main_annuncio.getOwner().equals(owner)) return false;
        annuncio.setOwner(owner);
        if(( !checkFields(annuncio) || categoriesTree.isValid(annuncio.getCategorie()) ) && Collections.disjoint(main_annuncio.getCategorie(),annuncio.getCategorie())) return false;
        annuncio.setExclusive(true);
        adRepository.save(annuncio);
        //LIKE
        streamBridge.send("likequeue",annuncio.getId() + " " + id + " true");

        return true;
    }

    public boolean Like(String id_src,String id_dst){
        //CREATE
        Annuncio annuncio_src = adRepository.findAnnuncioById(id_src);
        Annuncio annuncio_dest = adRepository.findAnnuncioById(id_dst);
        return !Collections.disjoint(annuncio_src.getCategorie(), annuncio_dest.getCategorie()) && (annuncio_src.isExclusive() || annuncio_dest.isExclusive()) && !annuncio_src.getOwner().equals(annuncio_dest.getOwner());
    }
}
