package com.matcher_service.mq;

import com.matcher_service.db.VectorD;
import com.matcher_service.db.VectorDRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.function.Consumer;

@Component
public class MatcherLikeConsumer {
    @Autowired
    VectorDRepo vectorDRepo;
    @Bean
    public Consumer<String> consumer() {
        return (ids) -> {
            String [] ids_array = ids.split(" ");
                if( ids_array.length ==3 && ids_array[2].equals("false")) like(ids_array);
                else exclusiveLike(ids_array);
        };
    }

    public boolean check
    public void like(String[] ids_array){
        Optional<VectorD> vectorD_src = vectorDRepo.findById(ids_array[0]);
        Optional<VectorD> vectorD = vectorDRepo.findById(ids_array[1]);
        List<String> vector_d = new ArrayList<>(vectorD.get().getVector_d());
        // DA RITORNARE UN 400 IN CASO DI CONDIZIONE NON SODDISFATTA
        if(!vector_d.contains(ids_array[0])) return;
        List<String> vector_l  = new ArrayList<>();
        if(vectorD.get().getVector_l() != null) vector_l.addAll(vectorD.get().getVector_l());
        System.out.println(vectorD.get().getOwner());
        vector_d.remove(ids_array[0]);
        vector_l.add(ids_array[0]);
        vectorD.get().setVector_d(vector_d);
        vectorD.get().setVector_l(vector_l);
        vectorDRepo.save(vectorD.get());
        List<String> vector_f  = new ArrayList<>();
        if(vectorD.get().getVector_f() != null) vector_f.addAll(vectorD_src.get().getVector_f());
        vector_f.add(ids_array[1]);
        vectorD_src.get().setVector_f(vector_f);
        vectorDRepo.save(vectorD_src.get());
    }
    public void exclusiveLike(String [] ids_array){
        Optional<VectorD> vectorD = vectorDRepo.findById(ids_array[1]);
        List<String> vector_l = new ArrayList<>();
        if(vectorD.get().getVector_l() != null) vector_l.addAll(vectorD.get().getVector_l());
        vector_l.add(ids_array[0]);
        vectorD.get().setVector_l(vector_l);
        vectorDRepo.save(vectorD.get());
       /* VectorD vectorD = new VectorD();
        List<VectorD> vectorDList = new ArrayList<>(vectorDRepo.findByCategoriesInAndOwnerNot(annuncio.getCategorie(),annuncio.getOwner()));
        List<String> vector = new ArrayList<>(vectorDList.stream().map(VectorD::getAd_id).toList());
        vectorD.setVector_d(vector);
        vectorD.setCategories(annuncio.getCategorie());
        vectorD.setAd_id(annuncio.getId());
        vectorD.setOwner(annuncio.getOwner());
        vectorDRepo.save(vectorD);
        // FARE REFACTORING DEL CODICE SOTTOSTANTE
        for( VectorD vectord : vectorDList){
            vector.clear();

            if(!annuncio.getOwner().equals(vectord.getOwner())) {
                vector.addAll(vectord.getVector_d());
                vector.add(vectorD.getAd_id());
                vectord.setVector_d(vector);
                vectorDRepo.save(vectord);
            }
        }*/
    }
}
