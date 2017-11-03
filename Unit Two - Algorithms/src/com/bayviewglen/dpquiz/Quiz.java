package com.bayviewglen.dpquiz;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Quiz {

	public static void main(String[] args) {
		read();
	}

	public static void read() {
		try {
			Scanner in = new Scanner(new File("Data/quiz.dat"));
			while(in.hasNextInt()) {
				int n = in.nextInt();
				int[] options = new int[3];
				for (int j = 0; j < 3; j++) {
					options[j] = in.nextInt();
				}
				solve(n, options);
			}
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}
	public static void solve(int n, int[] options) {
		int[] stepsTaken = new int[n+1];
		int[][] history = new int[n+1][2];
		for(int i = 2; i < n+1; i++) {
			//subtract by 1
			int minSteps = stepsTaken[i-1]; 
			int lastStep = i-1;
			int bestMove = -1;
			
			//check which division option works best
			for(int j = 0; j<3; j++) {
				if(options[j] > 1 && i%options[j] == 0 && (stepsTaken[i/options[j]] < minSteps)) {
					minSteps = stepsTaken[i/options[j]]; 
					lastStep = i/options[j];
					bestMove = options[j];
				}
			}
			
			//update my values and add 1 to how many steps
			stepsTaken[i] = minSteps + 1;
			history[i][0] = lastStep;
			history[i][1] = bestMove;
			//System.out.println(bestMove);
			
		}
		//display the steps 
		int i = n;
		while( i != 1) {
			if(history[i][1] == -1) {
				System.out.println("Subtract by one");
			}else {
				System.out.println("Divide by " + history[i][1]);
			}
			i = history[i][0];
		}
		//Display The solution
		System.out.println("Solution: " + stepsTaken[n] + " steps");
		System.out.println("---------------------");

	}
	
	public static void displaySteps() {
		
	}	
	public static void display(int[] arr){
		for(int i = 0; i<arr.length;i++) {
			System.out.print(arr[i] + ", ");
		}
		System.out.println();

	}
	public static void display(int[][] arr){
		for(int i = 0; i<arr.length;i++) {
			System.out.print(i + ", ");
		}
		System.out.println();
		for(int i = 0; i<arr.length;i++) {
			System.out.print(arr[i][0] + ", ");
		}
		System.out.println();
		for(int i = 0; i<arr.length;i++) {
			System.out.print(arr[i][1] + ", ");
		}
		System.out.println();

	}

}
