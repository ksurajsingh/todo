package kss.utility.todo.entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "category")
public class category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;
}