﻿// <auto-generated />
using System;
using Belt_Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Belt_Exam.Migrations
{
    [DbContext(typeof(MyContext))]
    [Migration("20200124070409_MakeMigration")]
    partial class MakeMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Belt_Exam.Models.DojoActivity", b =>
                {
                    b.Property<int>("DojoActivityId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("DurationUnit");

                    b.Property<int?>("DurationValue");

                    b.Property<DateTime>("Time");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<int>("UserId");

                    b.HasKey("DojoActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("DojoActivities");
                });

            modelBuilder.Entity("Belt_Exam.Models.Participation", b =>
                {
                    b.Property<int>("ParticipationId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("DojoActivityId");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<int>("UserId");

                    b.HasKey("ParticipationId");

                    b.HasIndex("DojoActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("Participations");
                });

            modelBuilder.Entity("Belt_Exam.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Belt_Exam.Models.DojoActivity", b =>
                {
                    b.HasOne("Belt_Exam.Models.User", "Coordinator")
                        .WithMany("Coordinating")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Belt_Exam.Models.Participation", b =>
                {
                    b.HasOne("Belt_Exam.Models.DojoActivity", "DojoActivity")
                        .WithMany("Participants")
                        .HasForeignKey("DojoActivityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Belt_Exam.Models.User", "Participant")
                        .WithMany("DojoActivities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
