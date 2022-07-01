<?php

namespace App\Controller;

use App\Entity\Student;
use App\Entity\Submission;
use App\Form\StudentForm;
use App\Form\SubmitForm;
use App\Repository\StudentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

date_default_timezone_set('Asia/Ho_Chi_Minh');
class StudentController extends AbstractController
{

    /**
     * @Route("/", name="welcome")
     */
    public function welcome(): Response
    {
        return $this->render('welcome.html.twig', []);
    }
    /**
     * @Route("/add/student", name="app_student")
     */
    public function index(ManagerRegistry $res, Request $req): Response
    {
        $std = new Student();
        $stdForm = $this->createForm(StudentForm::class,$std);


        $stdForm->handleRequest($req);
        $entity = $res->getManager();

        if($stdForm->isSubmitted() && $stdForm->isValid()){
            $data = $stdForm->getData();
            $std->setName($data->getName());
            $std->setCode($data->getCode());
            $std->setGr($data->getGr());

            $entity->persist($std);
            $entity->flush();

            return $this->redirectToRoute('app_student');
        }

        return $this->render('student/index.html.twig', [
            'form' => $stdForm->createView()
        ]);
    }

    /**
     * @Route("/submit", name="submit_form",methods={"GET"})
     */
    public function submitAction(ManagerRegistry $res, Request $req,StudentRepository $repo,SluggerInterface $slugger ): Response
    {
        // $f = new Submission();
        // $stdForm = $this->createForm(SubmitForm::class,$f);


        // // $stdForm->handleRequest($req);
        // $entity = $res->getManager();

        // if($stdForm->isSubmitted() && $stdForm->isValid()){
        //     $data = $stdForm->getData();
        //     $f->setGitHubLink($data->getGitHubLink());
        //     $sid = $req->request->get('student_Id');
        //     $student = $repo->findOneBy(['code'=>$sid]);
        //     $f->setStd($student);
        //     $f->setCreatedAt(new \DateTime());

        //     $fileUrl = $stdForm->get('fileUrl')->getData();
        //     if ($fileUrl) {
        //         $originalFilename = pathinfo($fileUrl->getClientOriginalName(), PATHINFO_FILENAME);
        //         //  SluggerInterface $slugger
        //         $safeFilename = $slugger->slug($originalFilename);
        //         $newFilename = $safeFilename.'-'.uniqid().'.'.$fileUrl->guessExtension();
        //         // Move the file to the directory where brochures are stored
        //         try {
        //             $fileUrl->move(
        //                 $this->getParameter('file_dir'),
        //                 $newFilename
        //             );
        //         } catch (FileException $e) {
        //             echo $e;
        //         }
        //         $f->setFileUrl($newFilename);
        //     }

        //     $entity->persist($f);
        //     $entity->flush();

        //     return $this->redirectToRoute('submit');
        // }

        return $this->render('submit/index2.html.twig', [
            // 'form' => $stdForm->createView()
        ]);
    }

     /**
     * @Route("/submit", name="submit_add",methods={"POST"})
     */
    public function addSubmitAction(Request $req, SluggerInterface $slugger,
    StudentRepository $repo, ManagerRegistry $reg): Response
    {
        $req = $this->tranform($req);
        $code = $req->request->get('code');
        $link = $req->request->get('link');
        $submit = new Submission();
        $student = $repo->findOneBy(['code'=>$code]);
        $submit->setStd($student);
        $submit->setGitHubLink($link);
        $submit->setCreatedAt(new \DateTime());
        $file = $req->files->get('file');
            if ($file) {
                $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                //  SluggerInterface $slugger
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
                // Move the file to the directory where brochures are stored
                try {
                    $file->move(
                        $this->getParameter('file_dir'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    echo $e;
                }
                $submit->setFileUrl($newFilename);
            }
        $entity = $reg->getManager();
        // $entity->persist($submit);
        // $entity->flush();      
        // if($stdForm->isSubmitted() && $stdForm->isValid()){
        //     $data = $stdForm->getData();
        //     $f->setGitHubLink($data->getGitHubLink());
        //     $sid = $req->request->get('student_Id');
        //     $student = $repo->findOneBy(['code'=>$sid]);
        //     $f->setStd($student);


        //     $fileUrl = $stdForm->get('fileUrl')->getData();
        //     if ($fileUrl) {
        //         $originalFilename = pathinfo($fileUrl->getClientOriginalName(), PATHINFO_FILENAME);
        //         //  SluggerInterface $slugger
        //         $safeFilename = $slugger->slug($originalFilename);
        //         $newFilename = $safeFilename.'-'.uniqid().'.'.$fileUrl->guessExtension();
        //         // Move the file to the directory where brochures are stored
        //         try {
        //             $fileUrl->move(
        //                 $this->getParameter('file_dir'),
        //                 $newFilename
        //             );
        //         } catch (FileException $e) {
        //             echo $e;
        //         }
        //         $f->setFileUrl($newFilename);
        //     }

        $entity->persist($submit);
        $entity->flush();

        //     return $this->redirectToRoute('submit');
        // }
        // $code = $req->get('doc');
        // // $code = $req->request->get('code');
        // // $link = $req->request->get('link');
        // // dd($req);
        // // $file = $req->files->get('doc');
        return $this->json([
            'status' => true,
            'code'=>$code,
            'link' => $link,
            'fileUrl' => $newFilename
        ]);
    }

    public function tranform(Request $re){
        $data = json_decode($re->getContent(), true);
        if($data === null){
            return $re;
        }
        $re->request->replace($data);
        return $re;
    }

    /**
     * @Route("/student", name="student_show",methods={"GET"})
     */
    public function showAction(StudentRepository $repo): Response
    {
        $students = $repo->findAll();

        $data = [];

        foreach($students as $s){
            $data[] = [
                'code' => $s->getCode()
            ];
        }
        return $this->json($data);
    }
    /**
     * @Route("/admin/getphoto/{filename}", name="get_photo")
     */
    public function getPhoto($filename) {
        $file = $this->getParameter('img_dir') . '/' . $filename;
        $response = new Response();
        $response->headers->set('Content-Type', 'image/jpg');
        $response->setContent(file_get_contents($file));
        return $response;
    }

    
}
