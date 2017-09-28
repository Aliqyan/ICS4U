package com.bayviewglen.multidimensionalarrays;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import com.bayviewglen.arrays.Contact;

public class GPS {
	static double[] shortestPath;
	static double[][] points;
	public static void main(String[] args) {
		// index, index, path
		shortestPath = new double[3];
		shortestPath[2] = 1000000;
		points = new double[8][2];
		read();
		for(double[] x : points) {
			for(double y : x) {
				System.out.print(y + ", ");
			}
			System.out.println();
		}
		
		for(int i = 0; i<8;i++) {
			for(int j = i+1; j<8; j++) {
				shortestPath(i, j);
			}
		}
		
		System.out.println("Shortest path is from (" + points[(int) shortestPath[0]][0] + ", " + points[(int) shortestPath[0]][1] + ") to (" + points[(int) shortestPath[1]][0] + ", " + points[(int) shortestPath[1]][1] + ")");
		
		

	}
	
	public static void shortestPath(int current, int other) {
		double length = Math.sqrt(Math.pow(points[current][0] - points[other][0], 2) + Math.pow(points[current][1] - points[other][1], 2) );
		if(length< shortestPath[2]) {
			shortestPath[0] = current;
			shortestPath[1] = other;
			shortestPath[2] = length;

		}
	}

	public static void read() {
		try {
			Scanner input = new Scanner(new File("data/GPS.dat"));
			for(int i= 0; i<8; i++) {
				double x = input.nextDouble(); 
				points[i][0] = x;
				double y = input.nextDouble(); 
				points[i][1] = y;
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
