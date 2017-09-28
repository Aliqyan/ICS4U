package com.bayviewglen.arrays;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Scanner;

public class WordSorter{

	public static void main(String[] args) throws FileNotFoundException {
		String[] allWords = new String[100];
		int wordCount = 0;

		Scanner input = new Scanner(new File("data/words.dat"));
		while (input.hasNext()) {
		    String word = input.next();
		    allWords[wordCount] = word;
		    wordCount++;
		}
		
		input.close();
		
		allWords = truncateArray(allWords, wordCount);
		
		Arrays.sort(allWords);
		
		display(allWords);
		System.out.println();
		display(removeMiddle(allWords));
		

	}

	private static String[] removeMiddle(String[] allWords) {
		int middle = allWords.length/2;
		String[] temp = new String[allWords.length-1];
		for(int i = 0; i < allWords.length-1 ;i++) {
			if(i < middle)
				temp[i] = allWords[i];
			else
				temp[i-1] = allWords[i];
		}
		return temp;
	}

	private static void display(String[] allWords) {
		for(String x : allWords) {
			System.out.println(x);
		}		
	}

	public static String[] truncateArray(String[] allWords, int wordCount) {
		String[] temp = new String[wordCount]; 
		for(int i = 0; i< wordCount; i++) {
			temp[i] = allWords[i];
		}
		return temp;
	}
	


}
