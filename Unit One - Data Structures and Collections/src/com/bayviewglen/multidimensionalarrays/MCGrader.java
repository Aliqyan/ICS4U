package com.bayviewglen.multidimensionalarrays;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class MCGrader {
	static char[][] responses;
	static int[] score;
	static char[] answers;
	public static void main(String[] args) {
		responses = new char[8][10];
		score = new int[10];
		read();
		check();

		for(int i = 0; i < 8; i++) {
			System.out.println("Student " + i + "'s correct count is " + score[i]);
		}
		
	}
	
	public static void check() {
		for(int i = 0; i < 8; i++) {
			int count = 0;
			for(int j = 0; j < 10; j++) {
				if(responses[i][j] == answers[j]) {
					count++;
				}
			}
			score[i] = count;
		}
	}
	
	
	public static void read() {
		try {
			Scanner input = new Scanner(new File("data/MCResponses.dat"));
			answers = input.nextLine().toCharArray();
			for(int i= 0; i<8; i++) {
				responses[i] = input.nextLine().toCharArray();

			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
