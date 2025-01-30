package com.vitalize.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
@Entity
public class Session {

    //unique id just to store who is using
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serailNum;
    //contact details
    private String name;
    private String email;
    private String phoneNumber;
    //address
    private String city;
    private String state;
    private String country;
    //gender for medical data
    private String gender;
    //to calculate age later
    private String dateOfBirth;
    //

    @ManyToOne
    private User user;
}
