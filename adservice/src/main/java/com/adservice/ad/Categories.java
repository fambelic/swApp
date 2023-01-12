package com.adservice.ad;

import org.springframework.stereotype.Component;
import java.util.*;


@Component
public class Categories {
    private final HashMap<String,List<String>> categories = new HashMap<>(){{

        put("Electronics",List.of("Computers","Smartphones","Tablets"));
        put("Women's fashion",List.of("Shoes","Jewelries","Jeans"));

    }};

    public boolean isValid(List<String> cats) {
        //soluzione sempliciotta
        int count=0;
        for (List<String> strings : categories.values().stream().toList()) {
            for (String cat : cats) if (strings.contains(cat)) count++;
        }
        return count == cats.size();
    }

}
