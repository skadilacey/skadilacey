/* Name:Scott Lacey
 * CS login:Scott
 * Section:M/W/F @ 13:20
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int arr2D[3000][500];

int main(int argc, char *argv[])
{

	for(int i = 0; i < 3000; i++) {
		for(int k = 0; k < 500; k++) {
			arr2D[i][k] = i + k;
		}
	}

	return 0;
}

