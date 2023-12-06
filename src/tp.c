#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <signal.h>

// int main ()
// {
//     void erreur ()
//     {
//         printf("erreur division par zero \n");exit(1);
//     }
//     int p;
//     int z = 0;
//     printf("Chiffre \n");
//     scanf("%d",&p);
//     p=p/z;
//     return 0;
// }

// /* programme 2 */


// int main ()
// {
//     void fin_attente ()
//     {
//         printf("signal reçu arret de la pause\n");
//         exit(1);
//     }
//     signal(SIGINT,fin_attente);
//     pause();
//     printf("je vais faire mon travail \n");
//     return 0;
// }

/* programme 3 */

// void alarme_handler() {
// printf("10 secondes écoulées\n"); }
// int main() {
// signal(SIGALRM,
// alarme_handler);
// alarm(10);
// pause();
// return 0;}

/* programme 4 */

// int k;
// void segv(){printf("Signal SIGSEGV %d Reçu, %d a provoqué la violation de mémoire\n",SIGSEGV,k);
// exit(EXIT_FAILURE);}
// int main() {
// signal(SIGSEGV,segv);
// char
// *buffer[2]={"Hello1","Hello2"};
// for (k=0;;k++) {
// printf("%s num %d\n",buffer[k],k);}return 0;}

/* programme 5 */

int main() {
int p =fork();
if (p==-1) {printf("erreur \n");}
else if (p==0) { printf("i am %d \n" ,getpid());
while(1) {printf("hello \n");}}
else if (p>0) {
sleep(1);
printf("Le processus %d est stopé par le signal %d \n",p,SIGSTOP);
kill(p,SIGSTOP);
sleep(1);
printf("le processus %d peut reprendre après le signal %d \n",p,SIGCONT) ;
kill(p,SIGCONT);
sleep(1);
printf("Le processus %d est tué par le signal %d \n",p,SIGKILL);
kill(p,SIGKILL);}
return 0;}